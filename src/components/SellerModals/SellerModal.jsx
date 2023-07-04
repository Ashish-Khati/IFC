import React from "react";
import style from "./SellerModal.module.css";
import CloseIcon from "@mui/icons-material/CloseRounded";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import { grey } from "@mui/material/colors";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import RowRadioButtonsGroup from "./RadioGroup";
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Link } from "react-router-dom";

export const SellerModal = () => {
  var slide1Style = {color:'rgb(92, 49, 235)' , fontSize:'90px' , }
  var slide2Style = { fontSize:'90px',}
  
  return (
    <>
      <form className={style.sellerwrapper}>
        <div className={style.heading}>
          <h1>Sell Your Product</h1>
          <CloseIcon
            sx={{ color: grey[700], fontSize: 40 }}
            className={style.closeIcon}
          />
        </div>
        <div className={style.section1}>
          <div className={style.emailAddress}>
            <h1 className={style.inputHeading}>
              Email address<span className={style.starInput}>*</span>
            </h1>
            <Input
              placeholder="Email address"
              size="lg"
              className={style.inputs}
              sx={{
                backgroundColor: "rgba(160, 160, 160, 0.088)",
                border: "1px solid grey",
              }}
            />
          </div>
          <div className={style.category}>
            <h1 className={style.inputHeading}>Choose Category</h1>
            <Select
              placeholder="Search Keywords"
              size="lg"
              className={style.inputs2}
              sx={{
                backgroundColor: "rgba(160, 160, 160, 0.088)",
                border: "1px solid grey",
              }}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>
          </div>
        </div>
        <div className={style.section1}>
          <div className={style.productName}>
            <h1 className={style.inputHeading}>
              Product Name<span className={style.starInput}>*</span>
            </h1>
            <Input
              placeholder="Product Name"
              size="lg"
              className={style.inputs}
              sx={{
                backgroundColor: "rgba(160, 160, 160, 0.088)",
                border: "1px solid grey",
              }}
            />
          </div>
          <div className={style.productCode}>
            <h1 className={style.inputHeading}>Product Code</h1>
            <Input
              placeholder="Product Code"
              size="lg"
              className={style.inputs}
              sx={{
                backgroundColor: "rgba(160, 160, 160, 0.088)",
                border: "1px solid grey",
              }}
            />
          </div>
        </div>
        <div className={style.section3}>
          <div className={style.productDescription}>
            <h1 className={style.inputHeading}>
              Product Description<span className={style.starInput}>*</span>
            </h1>

            <Textarea
              minRows={3}
              placeholder="Product Description"
              size="lg"
              className={style.inputs3}
              sx={{
                backgroundColor: "rgba(160, 160, 160, 0.088)",
                border: "1px solid grey",
              }}
            />
            <p>Feilds marked with (*) are mandatory</p>
          </div>
          <div className={style.uploadImages}>
            <h1 className={style.inputHeading}>Images</h1>
            <div className={style.imageSection}>
              <div className={style.image}>
                <AddPhotoAlternateIcon className={style.addPhoto} />
              </div>
              <div className={style.description}>
                <p className={style.main}>
                  <Link>Click to upload</Link> <span>or drag and drop</span>
                </p>
                <p className={style.secondary}>
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
            <div className={style.GST}>
              <h1 className={style.GSTheading}>
                GST <span className={style.starInput}>*</span>
              </h1>
              <RowRadioButtonsGroup />
            </div>
          </div>
        </div>
      </form>
      <div className={style.nextSection}>
        <div className={style.slide}>
          <HorizontalRuleRoundedIcon sx={slide1Style}/>
          <HorizontalRuleRoundedIcon sx={slide2Style}/>
        </div>
        <Link to='/sellerModalSecond'><h1 className={style.slideHeading}>Next <span><ArrowForwardIosRoundedIcon sx={{color:"white"}}/></span></h1></Link>
      </div>
    </>
  );
};
