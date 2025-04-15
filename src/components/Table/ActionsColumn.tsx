import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export type Action = {
  id: string;
  text: string;
  onClick: (id: string) => void;
};

type ActionsColumnProps = {
  rowId: string;
  actions: Action[];
};

const ActionsColumn: React.FC<ActionsColumnProps> = ({ rowId, actions }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={handleClick}
      >
        Actions
      </Button>
      <Menu
        id={`actions-menu-${rowId}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={() => {
              action.onClick(rowId);
              handleClose();
            }}
          >
            {action.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionsColumn;
