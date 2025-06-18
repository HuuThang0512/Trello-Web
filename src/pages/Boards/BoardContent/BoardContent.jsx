/* eslint-disable no-empty */
import Box from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"
import { mapOrder } from "~/utils/sorts"
import {
  DndContext,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from "@dnd-kit/core"
import { MouseSensor, TouchSensor } from "~/customLibraries/DndKitSensors"
import { arrayMove } from "@dnd-kit/sortable"
import { useCallback, useEffect, useRef, useState } from "react"
import { cloneDeep, isEmpty } from "lodash"

import Column from "./ListColumns/Column/Column"
import Card from "./ListColumns/Column/ListCards.jsx/Card/Card"

import { generatePlaceholderCard } from "~/utils/formatters"

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD"
}

const BoardContent = ({ board }) => {
  // Yêu cầu chuột di chuyển 10px mới kích hoạt event, phòng trường hợp click chuột cũng gọi event
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  /** Điểm va chạm cuối cùng trước đó, dùng để xử lí trong thuật toán phát hiện va chạm*/
  const lastOverId = useRef(null)
  // Trong 1 thời điểm chỉ có 1 phần tử được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((c) => c._id).includes(cardId)
    )
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn.cards.findIndex(
        (card) => card._id === overCardId
      )
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1
      const nextColumns = cloneDeep(prevColumns)
      /** Cột chứa thẻ đang được kéo */
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      )
      /** Cột chứa thẻ đang được đặt */
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      )
      /** Xóa thẻ đang được kéo khỏi cột chứa thẻ đang được kéo */
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (c) => c._id !== activeDraggingCardId
        )
        /**Xử lí thêm placeholder card khi column rỗng */
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((c) => c._id)
      }

      /** Thêm thẻ đang được kéo vào cột chứa thẻ đang được đặt */
      if (nextOverColumn) {
        /** Xóa thẻ đang được kéo khỏi cột chứa thẻ đang được đặt, tránh trường hợp trùng lặp thành 2 thẻ */
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (c) => c._id !== activeDraggingCardId
        )
        /** Thêm thẻ đang được kéo vào cột chứa thẻ đang được đặt */
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        })
        /** Xóa placeholder card khi column kéo card vào column rỗng */
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (c) => !c.FE_placeholderCard
        )
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((c) => c._id)
      }

      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo
  const handleDragStart = (event) => {
    const draggingCard = event?.active?.data?.current?.columnId
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      draggingCard ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (draggingCard) {
      const draggingCardColumn = findColumnByCardId(event?.active?.id)
      setOldColumnWhenDraggingCard(draggingCardColumn)
    }
  }

  /**
   *
   * Hàm xử lý khi phần tử đang được kéo
   * @param {event} event
   */
  function handleDragOver(event) {
    if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }

    const { active, over } = event

    // Xử lí trường hợp khi không tồn tại active hoặc over
    if (!active || !over) {
      return
    }

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    // Tìm 2 column của 2 card tương ứng
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // Trigger khi kéo xong
  const handleDragEnd = (event) => {
    const { active, over } = event

    // Xử lí trường hợp khi không tồn tại active hoặc over
    if (!active || !over) {
      return
    }

    if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      // Tìm 2 column của 2 card tương ứng
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // const oldCardIndex = overColumn?.cards?.findIndex(
        //   (c) => c._id === activeDragItemId
        // )
        // const newCardIndex = overColumn?.cards?.findIndex(
        //   (c) => c._id === overCardId
        // )
        // const dndOrderedCards = arrayMove(
        //   overColumn?.cards,
        //   oldCardIndex,
        //   newCardIndex
        // )
        // setOrderedColumns((prevColumns) => {
        //   const newColumns = cloneDeep(prevColumns)
        //   const targetColumn = newColumns.find(
        //     (column) => column._id === overColumn._id
        //   )
        //   targetColumn.cards = dndOrderedCards
        //   targetColumn.cardOrderIds = dndOrderedCards.map((c) => c._id)
        //   return newColumns
        // })
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        )
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        )
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )
        setOrderedColumns((prevColumns) => {
          const newColumns = cloneDeep(prevColumns)
          const targetColumn = newColumns.find(
            (column) => column._id === oldColumnWhenDraggingCard._id
          )
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((c) => c._id)

          return newColumns
        })
      }
    }

    if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu kéo column đến vị trí khác
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        )
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        )
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        )
        // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
        setOrderedColumns(dndOrderedColumns)
      }
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: 0.5 } }
    })
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections?.length) return

      // Tìm overId đàu tiên trong intersections
      let overId = getFirstCollision(pointerIntersections, "id")
      if (overId) {
        const checkColumn = orderedColumns.find((c) => c._id === overId)
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers?.filter(
              (c) =>
                c.id !== overId && checkColumn?.cardOrderIds?.includes(c.id)
            )
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode == "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0"
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
