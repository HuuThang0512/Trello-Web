import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Card as MuiCard } from "@mui/material/"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import GroupsIcon from "@mui/icons-material/Groups"
import CommentIcon from "@mui/icons-material/Comment"
import AttachmentIcon from "@mui/icons-material/Attachment"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const Card = ({ card }) => {
  const shouldShowCardActions =
    !!card?.memberIds?.length > 0 ||
    !!card?.comments?.length > 0 ||
    !!card?.attachments?.length > 0
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })

  const dndKitCardStyle = {
    // touchAcion: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #42a5f5" : undefined
  }
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
        display: card.FE_placeholderCard ? "none" : "block",
        border: "1px solid transparent",
        "&:hover": {borderColor: (theme) => theme.palette.primary.main}
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          title="green iguana"
        />
      )}
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>{card.title}</Typography>
      </CardContent>
      {shouldShowCardActions && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card?.memberIds?.length > 0 && (
            <Button size="small" startIcon={<GroupsIcon />}>
              {card.memberIds.length}
            </Button>
          )}
          {!!card?.comments?.length > 0 && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card.comments.length}
            </Button>
          )}
          {!!card?.attachments?.length > 0 && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
