import React, { ReactNode } from "react";
import styles from "./Card.module.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ICard {
  title?: string;
  children?: ReactNode;
  favorite?: boolean;
  isFavorite?: (id: any) => void;
  onDelete?: (id: any) => void;
  onEdit?: (id: any) => void;
}

const Card: React.FC<ICard> = (props) => {
  return (
    <div className={styles.Card} data-aos="fade-left">
      <div className={styles.wrapFavoriteIcon}>
        {props.isFavorite && (
          <>
            {props.favorite ? (
              <FavoriteIcon
                className={styles.iconBtnisFavorite}
                onClick={props.isFavorite}
              />
            ) : (
              <FavoriteBorderIcon
                className={styles.iconBtnisFavorite}
                onClick={props.isFavorite}
              />
            )}
          </>
        )}
      </div>
      <h2>{props.title}</h2>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.wrapIconsBtn}>
        {props.onEdit && (
          <BorderColorIcon className={styles.iconBtn} onClick={props.onEdit} />
        )}

        {props.onDelete && (
          <DeleteForeverIcon
            className={styles.iconBtn}
            onClick={props.onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
