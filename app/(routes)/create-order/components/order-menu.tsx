"use client";

import OrderList from "./order-list";
import { useState } from "react";
import _ from "lodash";
import useOrderMenu from "@/hooks/useOrderMenu";

interface OrderMenuProps {
  url: string;
  name: string;
  CreaterId: string;
  ArtistName: string;
}
const OrderMenu: React.FC<OrderMenuProps> = ({
  url,
  name,
  CreaterId,
  ArtistName,
}) => {
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (event?: React.SyntheticEvent, isExpanded?: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleButtonClick = (panel: string) => {
    setExpanded((prevExpandedPanel) =>
      prevExpandedPanel === panel ? false : panel
    );
  };
  const {
    postsCount,
    ViewsValue,
    FollowersValue,
    LikesValue,
    CommentsValue,
    SharesValue,
  } = useOrderMenu();
  const total = ViewsValue + FollowersValue + LikesValue + SharesValue + CommentsValue;
  let isdisable = total > 0 ? (CommentsValue > 0 ? ((postsCount - 1) > 0 ? false : true) : false) : false;
  return (
    <div className="flex-1 pt-16 min-h-[91.6vh] max-w-full">
      <div className="md:px-32 px-4 flex flex-col gap-4">
        <OrderList
          ListTwo
          defaultExpanded={true}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          onButtonClick={handleButtonClick}
        />
        <OrderList
          ListThree
          CreatorId={CreaterId}
          disable={CommentsValue === 0}
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          onButtonClick={handleButtonClick}
        />
        <OrderList
          ListFour
          disable={(FollowersValue === 0 && ViewsValue === 0 && LikesValue === 0 && SharesValue===0)|| CommentsValue > 0 && (postsCount-1) === 0}
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
         ArtistName={ArtistName}
        />
      </div>
    </div>
  );
};

export default OrderMenu;
