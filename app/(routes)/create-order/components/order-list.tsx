"use client";

import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CiCircleQuestion } from "react-icons/ci";
import { Checkbox, FormGroup, Slider, TextField } from "@mui/material";
import Dialogue from "./dialogue";
import Button from "./button";
import axios from "axios";
import limitDecimalPlaces from "@/actions/limit-number-decimal";
import toast from "react-hot-toast";

import useOrderMenu from "@/hooks/useOrderMenu";
import FindIndex from "@/actions/find-index-price";
import { useRouter } from "next/navigation";
import PriceSlider from "./silderDiagConponent/PriceSlider";
import PostMenu from "./post-menu";
import {
  SharesCustomMarks,
  FollowersCustomMarks,
  ViewsCustomMarks,
  CommentsCustomMarks,
  LikesCustomMarks,
} from "@/lib/custom-marks";
import {
  SharePrices,
  FollowerPrices,
  ViewPrices,
  CommentPrices,
  LikePrices,
} from "@/lib/Prices";

interface OrderListProps {
  disable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event?: React.SyntheticEvent, isExpanded?: boolean) => void;
  onButtonClick?: (panel: string) => void;
  CreatorId?: string;
  ArtistName?: string;
  ListTwo?: boolean;
  ListThree?: boolean;
  ListFour?: boolean;
}

const OrderList: React.FC<OrderListProps> = ({
  disable,
  onButtonClick,
  defaultExpanded,
  expanded,
  onChange,
  CreatorId,
  ArtistName,
  ListTwo,
  ListThree,
  ListFour,
}) => {
  const {
    postsCount,
    setLikesValue,
    setFollowersValue,
    setSharesValue,
    setCommentsValue,
    setViewsValue,
    ViewsValue,
    LikesValue,
    SharesValue,
    CommentsValue,
    checkedPosts,
    FollowersValue,
  } = useOrderMenu();
  const [Email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ViewsPrice = FindIndex(ViewsCustomMarks, ViewsValue);
  const FollowersPrice = FindIndex(FollowersCustomMarks, FollowersValue);
  const LikesPrice = FindIndex(LikesCustomMarks, LikesValue);
  const SharesPrice = FindIndex(SharesCustomMarks, SharesValue);
  const CommentsPrice = FindIndex(CommentsCustomMarks, CommentsValue);
  const total = (ViewPrices[ViewsPrice] + FollowerPrices[FollowersPrice]+LikePrices[LikesPrice]+SharePrices[SharesPrice]+CommentPrices[CommentsPrice]);

  const Discount = limitDecimalPlaces(total * 0.05, 2);
  const OrderTotal = limitDecimalPlaces(total - Discount, 2);

  const router = useRouter();
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/create-order", {
        OrderTotal,
        ViewsValue,
        SharesValue,
        LikesValue,
        CommentsValue,
        FollowersValue,
        ArtistName,
        Email,
        checkedPosts,
      });
      router.refresh();
      toast.success("Test success");
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Accordion
        className="!rounded-lg py-2"
        defaultExpanded={defaultExpanded}
        sx={{
          background: "#202020",
        }}
        expanded={expanded}
        disabled={disable}
        onChange={typeof onChange === "function" ? onChange : () => {}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-white " />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {(ListTwo || ListThree || ListFour) && (
            <div className="px-4">
              <span className="font-semibold text-white">
                {(ListTwo && "Your Order") ||
                  (ListThree && "Select Order") ||
                  (ListFour && "Confirm Details")}
              </span>
            </div>
          )}
        </AccordionSummary>
        {ListTwo && (
          <AccordionDetails>
            <div className="flex flex-col px-4 border-t-[1px] border-[#9146FF]">
              <div className="pt-4">
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex relative gap-2 items-center">
                    <span className="font-semibold text-white">
                      {FollowersValue} Followers
                    </span>
                    <span className="text-white group flex gap-2 font-extralight text-sm items-center">
                      <CiCircleQuestion
                        size={25}
                        className="text-white  relative"
                      />
                      <Dialogue
                        className="top-[100%] left-0 -translate-x-[25%]"
                        label="We can send viewers to any Twitch channel using the safest Twitch boosting services."
                        ListOne="Start time: Live viewers may take up to 30 minutes to arrive on your live stream and will stay for the duration you have ordered."
                        ListTwo=""
                      />
                    </span>
                  </div>
                  <span className="text-white text-sm font-light">
                    ${FollowerPrices[FollowersPrice]}
                  </span>
                </div>
                <PriceSlider
                  setValue={setFollowersValue}
                  ValueArray={FollowersCustomMarks}
                  disabled={false}
                />
              </div>
              <div className="pt-4">
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex gap-2 items-center relative">
                    <span className="font-semibold text-white">
                      {ViewsValue} Views
                    </span>
                    <span className="text-white group flex gap-2 font-extralight text-sm items-center">
                      <CiCircleQuestion size={25} className="text-white" />
                      <Dialogue
                        className="left-0 -translate-x-[22%] top-[100%]"
                        label="We can send viewers to any Twitch channel using the safest Twitch boosting services."
                        ListOne="Start time: Live viewers may take up to 30 minutes to arrive on your live stream and will stay for the duration you have ordered."
                        ListTwo=""
                      />
                    </span>
                  </div>
                  <span className="text-white text-sm font-light">
                    ${ViewPrices[ViewsPrice]}
                  </span>
                </div>
                <PriceSlider
                  setValue={setViewsValue}
                  ValueArray={ViewsCustomMarks}
                  disabled={false}
                />
              </div>

              <div className="pt-4">
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold text-white">
                      {LikesValue} Likes
                    </span>
                    <span className="text-white relative group flex gap-2 font-extralight text-sm items-center">
                      <CiCircleQuestion size={25} className="text-white" />
                      <Dialogue
                        className="top-[100%] left-0 -translate-x-[50%]"
                        label="Want to boost your posts with Twitch Followers?"
                        ListOne="Speed : Most orders are completed within a couple of hours, however larger orders may take up to several days to be completed"
                        ListTwo="Start Time : Orders start within 24 Hours and the completion time varies on the size of the order. Small orders took 1-3 days whereas larger orders may took several weeks."
                      />
                    </span>
                  </div>
                  <span className="text-white text-sm font-light">
                    ${LikePrices[LikesPrice]}
                  </span>
                </div>
                <PriceSlider
                  setValue={setLikesValue}
                  ValueArray={LikesCustomMarks}
                  disabled={false}
                />
              </div>
              <div className="pt-4">
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex relative gap-2 items-center">
                    <span className="font-semibold text-white">
                      {SharesValue} Shares
                    </span>
                    <span className="text-white group flex gap-2 font-extralight text-sm items-center">
                      <CiCircleQuestion size={25} className="text-white" />

                      <Dialogue
                        className="top-[100%] left-0 -translate-x-[25%]"
                        label="Want to build credibility by boosting Video Views?"
                        ListOne="Speed : Most orders are completed within a couple of hours, however larger orders may take up to several days to be completed"
                        ListTwo="Start Time : Orders start within 24 Hours and the completion time varies on the size of the order. Small orders took 1-3 days whereas larger orders may took several weeks."
                      />
                    </span>
                  </div>
                  <span className="text-white text-sm font-light">
                    ${SharePrices[SharesPrice]}
                  </span>
                </div>
                <PriceSlider
                  setValue={setSharesValue}
                  ValueArray={SharesCustomMarks}
                  disabled={false}
                />
              </div>
              <div className="pt-4">
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex relative gap-2 items-center">
                    <span className="font-semibold text-white">
                      {CommentsValue} Comments
                    </span>
                    <span className="text-white group flex gap-2 font-extralight text-sm items-center">
                      <CiCircleQuestion size={25} className="text-white" />

                      <Dialogue
                        className="top-[100%] left-0 -translate-x-[25%]"
                        label="Want to build credibility by boosting Video Views?"
                        ListOne="Speed : Most orders are completed within a couple of hours, however larger orders may take up to several days to be completed"
                        ListTwo="Start Time : Orders start within 24 Hours and the completion time varies on the size of the order. Small orders took 1-3 days whereas larger orders may took several weeks."
                      />
                    </span>
                  </div>
                  <span className="text-white text-sm font-light">
                    ${CommentPrices[CommentsPrice]}
                  </span>
                </div>
                <PriceSlider
                  setValue={setCommentsValue}
                  ValueArray={CommentsCustomMarks}
                  disabled={false}
                />
              </div>
              <div className="flex justify-between items-center text-white py-3 border-b-[1px] border-[#9146FF]">
                <span className="font-medium text-sm">Discount</span>
                <span className="font-light text-sm">-${Discount}</span>
              </div>
              <div className="flex justify-between text-white w-full py-3">
                <h2 className="flex-1">Order Total</h2>
                <div className="flex-1 flex flex-col items-end">
                  <span className="text-lg font-medium">${OrderTotal}</span>
                  <span className="text-xs font-light">Approx. </span>
                </div>
              </div>
              <Button Label={
                CommentsValue === 0 ? "Next: Confirm Details" :
                "Next: Select Post(s)"
              }
              onClick={() => CommentsValue === 0 ? onButtonClick?.("panel3")  : onButtonClick?.("panel2") }
              disabled={LikesValue ===0 && CommentsValue === 0 && FollowersValue === 0 && SharesValue === 0 &&ViewsValue === 0} />
            </div>
          </AccordionDetails>
        )}
        {ListThree && (
          <AccordionDetails>
            <div className="px-4 py-3 flex flex-col gap-4 text-white border-t-[1px] border-[#9146FF]">
              <span className="text-sm font-light">
                Your Saves are calculated per Video
              </span>
              <h3 className="text-base font-semibold text-[#9146FF]">
                Select Video(s)
              </h3>
              <PostMenu CreatorId={CreatorId} />
              <Button
                Label="Confirm Payment"
                disabled={postsCount - 1 === 0}
                onClick={() => onButtonClick?.("panel3")}
              />
            </div>
          </AccordionDetails>
        )}
        {ListFour && (
          <AccordionDetails>
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 px-4 border-t-[1px] pt-4 border-[#9146FF] text-white"
            >
              <p className="text-sm font-light">
                Please enter your email address. This is where we will send you
                updates on your Viewpals campaign.
              </p>
              <TextField
                id="outlined-basic"
                sx={{
                  "& label": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    color: "white",
                    "&:hover fieldset": {
                      borderColor: "#9146FF",
                    },
                  },
                }}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                required
                type="email"
                variant="outlined"
              />
              <FormGroup>
                <FormControlLabel
                  className="font-light text-sm select-none"
                  control={
                    <Checkbox
                      required
                      sx={{
                        color: "#9146FF",
                        borderRadius: "50%",
                        "&.Mui-checked": {
                          color: "#9146FF",
                          borderRadius: "50%",
                        },
                      }}
                      id="Song-Check"
                      className="text-[#9146FF]"
                    />
                  }
                  label={
                    <p className="text-sm font-light">
                      You agree to our
                      <a href="" className="underline ml-1">
                        Terms
                      </a>{" "}
                      &{" "}
                      <a href="" className="underline ml-1">
                        Refund Policy
                      </a>
                    </p>
                  }
                />
              </FormGroup>
              <Button
                Label="Continue to Payment"
                disabled={isLoading}
                className="self-center"
              />
              <p className="text-white text-xs text-light self-center mt-4">
                By clicking Pay button you agree to our
                <a href="#" className="text-[#9146FF] ml-1 underline">
                  Terms of use
                </a>
              </p>
            </form>
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
};

export default OrderList;
