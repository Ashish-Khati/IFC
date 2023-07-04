import React, { useState } from "react";
import style from "./SellerModal.module.css";
import CloseIcon from "@mui/icons-material/CloseRounded";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import { grey } from "@mui/material/colors";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import RowRadioButtonsGroup from "./RadioGroup";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Grid, Modal, Select, MenuItem } from "@mui/material";
import { closeProductFormModal } from "../../redux/store/modalSlice";
import Input from "../Input";
import QuantityMenu from "../QuantityMenu";
import { SUB_CATEGORY } from "../../constants/list";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { postProduct } from "../../redux/api";
import { PRODUCT_UNIT } from "../../constants/product";

const formInintialData = {
  price: { value: "", unit: "piece" },
  name: "",
  category: "solid",
  subCategory: "Animal Tallow",
  description: "",
  gst: 0,
  imagesUrl: [],
  inStock: true,
  state: "",
  postalCode: "",
  city: "",
  addressLine: "",
};

export default function ProductFormModal() {
  const { isOpen } = useSelector((state) => state.modal.productFormModal);
  const [formData, setFormData] = useState(formInintialData);
  const [productImages, setProductImages] = useState([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeProductFormModal());
  }

  async function handleSubmit() {
    if (step === 0) {
      setStep(1);
      return;
    }
    setLoading(true);
    try {
      const { state, postalCode, addressLine, city, ...rest } = formData;
      await postProduct(() => {}, {
        location: { state, postalCode, addressLine, city, country: "India" },
        ...rest,
        images: productImages,
        sellerId: currentUser.id,
        byAdmin: false,
      });
      setFormData(formInintialData);
      setProductImages([]);
      setLoading(false);
      dispatch(closeProductFormModal());
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  function uploadImage(e) {
    const file = e.target.files;
    setProductImages((p) => [...p, ...file]);
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
    >
      <div
        className="bg-white rounded-md"
        style={{ height: "80vh", width: "80vw" }}
      >
        <h1 className="font-bold text-4xl my-2 ml-6">Product details</h1>
        <div className="w-full px-12">
          {step === 0 ? (
            <Grid container>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <Input
                    placeholder="Enter product name"
                    value={formData.name}
                    name="name"
                    required
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    title="Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <p className={style.inputHeading}>Category</p>
                    <Select
                      placeholder="Select a Category"
                      size="md"
                      value={formData.category}
                      name="category"
                      className={style.inputs2}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, category: e.target.value }))
                      }
                      sx={{
                        backgroundColor: "rgba(160, 160, 160, 0.088)",
                        border: "1px solid grey",
                      }}
                    >
                      <MenuItem value="solid">Solid</MenuItem>
                      <MenuItem value="liquid">Liqiud</MenuItem>
                      <MenuItem value="gas">Gas</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={6}>
                    <p className={style.inputHeading}>Sub Category</p>
                    <Select
                      placeholder="Select sub Category"
                      size="md"
                      name="subCategory"
                      className={style.inputs2}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          subCategory: e.target.value,
                        }))
                      }
                      value={formData.subCategory}
                      sx={{
                        backgroundColor: "rgba(160, 160, 160, 0.088)",
                        border: "1px solid grey",
                      }}
                    >
                      {SUB_CATEGORY[formData.category].map(
                        ({ title }, index) => {
                          return (
                            <MenuItem key={index} value={title}>
                              {title}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="flex flex-col w-full h-[60px] gap-[5px]">
                      <div className="font-poppins text-sm leading-[18px] font-semibold text-[#151515]">
                        Price
                      </div>
                      <div className="w-full flex flex-row border-1 pl-[5px] border-[#D1D1D1] rounded-xl bg-[#F9F9F9] items-center">
                        <input
                          placeholder="Enter product rate"
                          type="number"
                          name="Quantity"
                          value={formData.price.value}
                          required={true}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              price: { ...p.price, value: e.target.value },
                            }))
                          }
                          className="h-[19px] w-[60%] pl-[5px] outline-none bg-[#F9F9F9] font-sans text-sm text-[#D1D1D1] ml-[2px]"
                        />
                        {"|"}
                        <QuantityMenu
                          unit={formData.price.unit}
                          setUnit={(val) =>
                            setFormData((p) => ({
                              ...p,
                              price: { ...p.price, unit: val },
                            }))
                          }
                          units={PRODUCT_UNIT}
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <div className={style.productDescription}>
                    <h1 className={style.inputHeading}>
                      Description
                      <span className={style.starInput}>*</span>
                    </h1>

                    <Textarea
                      minRows={3}
                      name="description"
                      value={formData.description}
                      placeholder="Product Description"
                      size="lg"
                      required={true}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      className={style.inputs3}
                      sx={{
                        backgroundColor: "rgba(160, 160, 160, 0.088)",
                        border: "1px solid grey",
                      }}
                    />
                    <p>Feilds marked with (*) are mandatory</p>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    onChange={uploadImage}
                    name="file"
                    required={true}
                    multiple
                  />
                  <div className={style.uploadImages}>
                    <h1 className={style.inputHeading}>Images</h1>
                    <div className={style.imageSection}>
                      {productImages.map((img, index) => {
                        return (
                          <label
                            key={index}
                            className={style.image}
                            style={{ marginLeft: "10px" }}
                          >
                            <img
                              src={URL.createObjectURL(img)}
                              height={"100%"}
                              width={"100%"}
                              style={{ borderRadius: "45%" }}
                              alt="pic"
                            />
                          </label>
                        );
                      })}

                      {productImages?.length <= 4 && (
                        <label
                          className={style.image}
                          for="file"
                          style={{ marginLeft: "10px" }}
                        >
                          <AddPhotoAlternateIcon className={style.addPhoto} />
                        </label>
                      )}
                      {!productImages[0] && (
                        <div className={style.description}>
                          <p className={style.main}>
                            <div>
                              <label for="file">Choose file to upload</label>
                            </div>
                          </p>
                          <p className={style.secondary}>
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={style.GST}>
                      <h1 className={style.GSTheading}>
                        GST <span className={style.starInput}>*</span>
                      </h1>
                      <RowRadioButtonsGroup
                        value={formData.gst}
                        onChange={(val) =>
                          setFormData((p) => ({
                            ...p,
                            gst: val,
                          }))
                        }
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={6}>
                <Input
                  placeholder="Enter Address"
                  value={formData.addressLine}
                  name="addressLine"
                  required
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, addressLine: e.target.value }))
                  }
                  title="Address"
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  placeholder="Enter city"
                  value={formData.city}
                  name="city"
                  required
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, city: e.target.value }))
                  }
                  title="city"
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  placeholder="Enter state"
                  value={formData.state}
                  name="state"
                  required
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, state: e.target.value }))
                  }
                  title="state"
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  placeholder="Enter Postal Code"
                  value={formData.postalCode}
                  name="postalCode"
                  required
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, postalCode: e.target.value }))
                  }
                  title="Postal Code"
                />
              </Grid>
            </Grid>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-4 bg-[#5932EA] rounded-xl font-poppins text-[#FFFFFF] font-bold items-center justify-center mt-[15px] "
          >
            {loading ? "Loading" : step === 1 ? "Post Product" : "Next"}
          </button>
          {step === 1 && (
            <button
              onClick={() => setStep(0)}
              className="px-6 py-4 bg-[#5932EA] rounded-xl font-poppins text-[#FFFFFF] font-bold items-center justify-center mt-[15px] "
            >
              Previous
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
