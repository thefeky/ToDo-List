import "./taskcard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { Box, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const TaskCard = ({ task, status, handleDelete, handleStatusChange }) => {
  return (
    <Card
      sx={{
        width: 400,
        border: "1px solid black",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px",
        textAlign: "left",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {task.task}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CardActions>
          <Tooltip title="Doing">
            <Button
              size="small"
              color="warning"
              sx={{ minWidth: "12px" }}
              onClick={() => handleStatusChange(task.id, "doing")}
            >
              {status === "todo" ? (
                <FontAwesomeIcon icon={faFilter} className="button_icon" />
              ) : null}
            </Button>
          </Tooltip>
          <Tooltip title="Done">
            <Button
              size="small"
              color="success"
              sx={{ minWidth: "12px" }}
              onClick={() => handleStatusChange(task.id, "done")}
            >
              {status === "done" ? null : (
                <FontAwesomeIcon icon={faCheck} className="button_icon" />
              )}
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              size="small"
              color="error"
              sx={{ minWidth: "12px" }}
              onClick={() => handleDelete(task.id)}
            >
              {" "}
              <FontAwesomeIcon icon={faTrashCan} className="button_icon" />
            </Button>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
};
TaskCard.propTypes = {
  task: PropTypes.shape({
    task: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskCard;
