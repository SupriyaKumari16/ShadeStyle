import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const STORAGE_KEY = "shadestyle_address";

const getSavedAddress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [address, setAddress] = useState(getSavedAddress);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    state: "",
    city: "",
    addressLine: "",
    addressType: "HOME",
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const deliveryCharge = cartTotal >= 999 ? 0 : 49;
  const totalAmount = cartTotal + deliveryCharge;

  const openAddressForm = () => {
    if (address) {
      setFormData({
        name: address.name || "",
        mobile: address.mobile || "",
        pincode: address.pincode || "",
        state: address.state || "",
        city: address.city || "",
        addressLine: address.addressLine || "",
        addressType: address.addressType || "HOME",
      });
    } else {
      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        state: "",
        city: "",
        addressLine: "",
        addressType: "HOME",
      });
    }

    setShowAddressForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveAddress = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.mobile.trim() ||
      !formData.pincode.trim() ||
      !formData.state.trim() ||
      !formData.city.trim() ||
      !formData.addressLine.trim()
    ) {
      alert("Please fill all delivery address details.");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    const newAddress = {
      ...formData,
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      pincode: formData.pincode.trim(),
      state: formData.state.trim(),
      city: formData.city.trim(),
      addressLine: formData.addressLine.trim(),
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newAddress)
    );

    setAddress(newAddress);
    setShowAddressForm(false);

    alert("Address saved successfully!");
  };

  const cancelAddressChange = () => {
    setShowAddressForm(false);
  };

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please add a delivery address first.");
      openAddressForm();
      return;
    }

    if (!cart.length) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    alert(
      `Order placed successfully using ${paymentMethod}!`
    );
  };

  if (!cart.length) {
    return (
      <EmptyPage>
        <EmptyCard>
          <EmptyIcon>🛍️</EmptyIcon>

          <h2>Your cart is empty</h2>

          <p>
            Add some beautiful products to continue checkout.
          </p>

          <ShopButton onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </ShopButton>
        </EmptyCard>
      </EmptyPage>
    );
  }

  return (
    <Page>
      {/* =========================
          HEADER
      ========================== */}

      <TopBar>
        <Logo onClick={() => navigate("/")}>
          ShadeStyle
        </Logo>

        <SecureText>
          <span>🔒</span>
          Secure Checkout
        </SecureText>
      </TopBar>

      {/* =========================
          CHECKOUT
      ========================== */}

      <CheckoutWrapper>
        {/* =================================
            LEFT SIDE
        ================================== */}

        <LeftColumn>
          {/* CHECKOUT STEPS */}

          <Steps>
            <Step>
              <StepCircle $completed>
                ✓
              </StepCircle>

              <StepText>
                Address
              </StepText>
            </Step>

            <StepLine />

            <Step $active>
              <StepCircle $active>
                2
              </StepCircle>

              <StepText $active>
                Order Summary
              </StepText>
            </Step>

            <StepLine />

            <Step>
              <StepCircle>
                3
              </StepCircle>

              <StepText>
                Payment
              </StepText>
            </Step>
          </Steps>

          {/* =================================
              1. DELIVERY ADDRESS
          ================================== */}

          <Section>
            <SectionHeader>
              <SectionTitle>
                <StepNumber>
                  1
                </StepNumber>

                DELIVERY ADDRESS
              </SectionTitle>

              {address && !showAddressForm && (
                <ChangeButton
                  type="button"
                  onClick={openAddressForm}
                >
                  CHANGE
                </ChangeButton>
              )}
            </SectionHeader>

            {/* SAVED ADDRESS */}

            {address && !showAddressForm && (
              <SavedAddress>
                <DeliverTo>
                  Deliver to:
                </DeliverTo>

                <AddressNameRow>
                  <strong>
                    {address.name}
                  </strong>

                  <AddressType>
                    {address.addressType}
                  </AddressType>
                </AddressNameRow>

                <AddressText>
                  {address.addressLine},{" "}
                  {address.city},{" "}
                  {address.state}{" "}
                  {address.pincode}
                </AddressText>

                <MobileText>
                  {address.mobile}
                </MobileText>
              </SavedAddress>
            )}

            {/* ADD ADDRESS */}

            {!address && !showAddressForm && (
              <AddAddressBox
                onClick={openAddressForm}
              >
                <Plus>
                  +
                </Plus>

                <div>
                  <AddAddressTitle>
                    Add Delivery Address
                  </AddAddressTitle>

                  <AddAddressText>
                    Add an address to continue
                    with your order
                  </AddAddressText>
                </div>
              </AddAddressBox>
            )}

            {/* ADDRESS FORM */}

            {showAddressForm && (
              <AddressForm onSubmit={saveAddress}>
                <FormRow>
                  <FormGroup>
                    <Label>
                      Full Name
                    </Label>

                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Mobile Number
                    </Label>

                    <Input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength="10"
                      placeholder="10-digit mobile number"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>
                      Pincode
                    </Label>

                    <Input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      placeholder="6-digit pincode"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      State
                    </Label>

                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      City
                    </Label>

                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>
                    Full Address
                  </Label>

                  <TextArea
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    placeholder="House No., Street, Area, Landmark"
                    rows="4"
                  />
                </FormGroup>

                <AddressTypeWrapper>
                  <Label>
                    Address Type
                  </Label>

                  <AddressTypeOptions>
                    <TypeLabel>
                      <Radio
                        type="radio"
                        name="addressType"
                        value="HOME"
                        checked={
                          formData.addressType ===
                          "HOME"
                        }
                        onChange={handleChange}
                      />

                      HOME
                    </TypeLabel>

                    <TypeLabel>
                      <Radio
                        type="radio"
                        name="addressType"
                        value="WORK"
                        checked={
                          formData.addressType ===
                          "WORK"
                        }
                        onChange={handleChange}
                      />

                      WORK
                    </TypeLabel>
                  </AddressTypeOptions>
                </AddressTypeWrapper>

                <FormActions>
                  <CancelButton
                    type="button"
                    onClick={cancelAddressChange}
                  >
                    CANCEL
                  </CancelButton>

                  <SaveButton type="submit">
                    SAVE ADDRESS
                  </SaveButton>
                </FormActions>
              </AddressForm>
            )}
          </Section>

          {/* =================================
              2. ORDER SUMMARY
          ================================== */}

          <Section>
            <SectionHeader>
              <SectionTitle>
                <StepNumber>
                  2
                </StepNumber>

                ORDER SUMMARY
              </SectionTitle>
            </SectionHeader>

            <Products>
              {cart.map((item) => (
                <ProductCard
                  key={`${item._id || item.id}-${item.selectedSize}`}
                >
                  <ProductImageWrapper>
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                    />
                  </ProductImageWrapper>

                  <ProductInfo>
                    <ProductName>
                      {item.name}
                    </ProductName>

                    {item.selectedSize && (
                      <ProductMeta>
                        Size:{" "}
                        <strong>
                          {item.selectedSize}
                        </strong>
                      </ProductMeta>
                    )}

                    <ProductMeta>
                      Category:{" "}
                      {item.category ||
                        "Fashion"}
                    </ProductMeta>

                    <PriceRow>
                      <ProductPrice>
                        ₹{item.price}
                      </ProductPrice>

                      {item.rating && (
                        <Rating>
                          ★ {item.rating}
                        </Rating>
                      )}
                    </PriceRow>

                    <QuantityRow>
                      <QuantityLabel>
                        Qty:
                      </QuantityLabel>

                      <QuantityBox>
                        <QuantityButton
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item._id ||
                                item.id,
                              item.selectedSize
                            )
                          }
                        >
                          −
                        </QuantityButton>

                        <Quantity>
                          {item.quantity}
                        </Quantity>

                        <QuantityButton
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item._id ||
                                item.id,
                              item.selectedSize
                            )
                          }
                        >
                          +
                        </QuantityButton>
                      </QuantityBox>

                      <RemoveButton
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            item._id ||
                              item.id,
                            item.selectedSize
                          )
                        }
                      >
                        REMOVE
                      </RemoveButton>
                    </QuantityRow>
                  </ProductInfo>

                  <ItemTotal>
                    ₹
                    {Number(
                      item.price || 0
                    ) *
                      Number(
                        item.quantity || 0
                      )}
                  </ItemTotal>
                </ProductCard>
              ))}
            </Products>
          </Section>
        </LeftColumn>

        {/* =================================
            RIGHT SIDE
        ================================== */}

        <RightColumn>
          {/* =================================
              3. PAYMENT
          ================================== */}

          <Section>
            <SectionHeader>
              <SectionTitle>
                <StepNumber>
                  3
                </StepNumber>

                PAYMENT
              </SectionTitle>
            </SectionHeader>

            <PaymentOptions>
              <PaymentOption
                $selected={
                  paymentMethod === "UPI"
                }
                onClick={() =>
                  setPaymentMethod("UPI")
                }
              >
                <Radio
                  type="radio"
                  checked={
                    paymentMethod === "UPI"
                  }
                  onChange={() =>
                    setPaymentMethod("UPI")
                  }
                />

                <PaymentContent>
                  <PaymentTitle>
                    UPI
                  </PaymentTitle>

                  <PaymentDescription>
                    Pay using Google Pay,
                    PhonePe, Paytm or any
                    UPI app
                  </PaymentDescription>
                </PaymentContent>
              </PaymentOption>

              <PaymentOption
                $selected={
                  paymentMethod === "CARD"
                }
                onClick={() =>
                  setPaymentMethod("CARD")
                }
              >
                <Radio
                  type="radio"
                  checked={
                    paymentMethod === "CARD"
                  }
                  onChange={() =>
                    setPaymentMethod("CARD")
                  }
                />

                <PaymentContent>
                  <PaymentTitle>
                    Credit / Debit Card
                  </PaymentTitle>

                  <PaymentDescription>
                    Visa, Mastercard, RuPay
                    and more
                  </PaymentDescription>
                </PaymentContent>
              </PaymentOption>

              <PaymentOption
                $selected={
                  paymentMethod ===
                  "NETBANKING"
                }
                onClick={() =>
                  setPaymentMethod(
                    "NETBANKING"
                  )
                }
              >
                <Radio
                  type="radio"
                  checked={
                    paymentMethod ===
                    "NETBANKING"
                  }
                  onChange={() =>
                    setPaymentMethod(
                      "NETBANKING"
                    )
                  }
                />

                <PaymentContent>
                  <PaymentTitle>
                    Net Banking
                  </PaymentTitle>

                  <PaymentDescription>
                    Pay securely through
                    your bank
                  </PaymentDescription>
                </PaymentContent>
              </PaymentOption>

              <PaymentOption
                $selected={
                  paymentMethod === "COD"
                }
                onClick={() =>
                  setPaymentMethod("COD")
                }
              >
                <Radio
                  type="radio"
                  checked={
                    paymentMethod === "COD"
                  }
                  onChange={() =>
                    setPaymentMethod("COD")
                  }
                />

                <PaymentContent>
                  <PaymentTitle>
                    Cash on Delivery
                  </PaymentTitle>

                  <PaymentDescription>
                    Pay when your order is
                    delivered
                  </PaymentDescription>
                </PaymentContent>
              </PaymentOption>
            </PaymentOptions>
          </Section>

          {/* =================================
              4. PRICE DETAILS
          ================================== */}

          <PriceCard>
            <PriceTitle>
              <StepNumber>
                4
              </StepNumber>

              PRICE DETAILS
            </PriceTitle>

            <PriceContent>
              <PriceLine>
                <span>
                  Price ({cartCount} items)
                </span>

                <span>
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </PriceLine>

              <PriceLine>
                <span>
                  Delivery Charges
                </span>

                <span>
                  {deliveryCharge === 0 ? (
                    <FreeText>
                      FREE
                    </FreeText>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </PriceLine>

              {deliveryCharge === 0 && (
                <FreeDelivery>
                  🎁 You saved ₹49 on
                  delivery!
                </FreeDelivery>
              )}

              <Divider />

              <TotalLine>
                <span>
                  Total Amount
                </span>

                <span>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </TotalLine>

              <Savings>
                ✦ Safe & secure checkout
                with ShadeStyle
              </Savings>

              {/* PLACE ORDER INSIDE 4 */}

              <PaymentButton
                type="button"
                onClick={handlePlaceOrder}
              >
                PLACE ORDER
              </PaymentButton>
            </PriceContent>
          </PriceCard>

          <SecurityCard>
            <SecurityIcon>
              🔒
            </SecurityIcon>

            <SecurityContent>
              <SecurityTitle>
                Safe & Secure Payments
              </SecurityTitle>

              <SecurityText>
                Your payment information is
                protected with secure
                encryption.
              </SecurityText>
            </SecurityContent>
          </SecurityCard>
        </RightColumn>
      </CheckoutWrapper>
    </Page>
  );
};

/* =========================================
   PAGE
========================================= */

const Page = styled.div`
  min-height: 100vh;
  background: #eaf2ec;
  color: #123f3d;
  padding-bottom: 4rem;
  font-family: inherit;
`;

const TopBar = styled.header`
  height: 76px;
  background: #f8f5ec;

  border-bottom: 1px solid
    rgba(18, 63, 61, 0.12);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 7%;

  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: 600px) {
    padding: 0 5%;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;

  letter-spacing: 0.08em;

  cursor: pointer;

  color: #123f3d;

  @media (max-width: 600px) {
    font-size: 1.35rem;
  }
`;

const SecureText = styled.div`
  color: #5d7772;

  font-size: 0.9rem;

  font-weight: 600;

  span {
    margin-right: 0.4rem;
  }

  @media (max-width: 600px) {
    font-size: 0.72rem;
  }
`;

/* =========================================
   MAIN LAYOUT
========================================= */

const CheckoutWrapper = styled.div`
  width: min(1180px, 92%);

  margin: 2rem auto;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr) 370px;

  gap: 1.2rem;

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  min-width: 0;
`;

const RightColumn = styled.aside`
  position: sticky;

  top: 95px;

  display: flex;

  flex-direction: column;

  gap: 0.8rem;

  @media (max-width: 900px) {
    position: static;
  }
`;

/* =========================================
   STEPS
========================================= */

const Steps = styled.div`
  background: #f8f5ec;

  min-height: 76px;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 0 1rem;

  margin-bottom: 0.7rem;

  border: 1px solid
    rgba(18, 63, 61, 0.1);

  @media (max-width: 500px) {
    padding: 0 0.5rem;
  }
`;

const Step = styled.div`
  display: flex;

  align-items: center;

  gap: 0.5rem;

  white-space: nowrap;
`;

const StepCircle = styled.div`
  width: 28px;
  height: 28px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 0.78rem;

  font-weight: 700;

  background: ${(props) =>
    props.$active ||
    props.$completed
      ? "#123F3D"
      : "#E5E1D7"};

  color: ${(props) =>
    props.$active ||
    props.$completed
      ? "#F8F5EC"
      : "#7C8580"};

  border: ${(props) =>
    props.$completed
      ? "2px solid #123F3D"
      : "1px solid rgba(18,63,61,0.1)"};
`;

const StepText = styled.span`
  color: ${(props) =>
    props.$active
      ? "#123F3D"
      : "#7B8580"};

  font-weight: ${(props) =>
    props.$active ? "800" : "600"};

  font-size: 0.78rem;

  text-transform: uppercase;

  @media (max-width: 500px) {
    font-size: 0.62rem;
  }
`;

const StepLine = styled.div`
  width: 75px;

  height: 1px;

  background: #c9d3cd;

  margin: 0 0.7rem;

  @media (max-width: 600px) {
    width: 25px;

    margin: 0 0.3rem;
  }
`;

/* =========================================
   SECTION
========================================= */

const Section = styled.section`
  background: #f8f5ec;

  border: 1px solid
    rgba(18, 63, 61, 0.1);

  margin-bottom: 0.8rem;
`;

const SectionHeader = styled.div`
  min-height: 62px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 1.1rem;

  border-bottom: 1px solid
    rgba(18, 63, 61, 0.1);
`;

const SectionTitle = styled.div`
  display: flex;

  align-items: center;

  gap: 0.7rem;

  font-size: 0.82rem;

  letter-spacing: 0.08em;

  font-weight: 800;
`;

const StepNumber = styled.span`
  width: 25px;

  height: 25px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #123f3d;

  color: #f8f5ec;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 0.72rem;
`;

/* =========================================
   ADDRESS
========================================= */

const ChangeButton = styled.button`
  border: 1px solid #123f3d;

  background: transparent;

  color: #123f3d;

  padding: 0.55rem 1.3rem;

  font-size: 0.75rem;

  font-weight: 800;

  letter-spacing: 0.04em;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    background: #123f3d;

    color: #f8f5ec;
  }
`;

const SavedAddress = styled.div`
  padding: 1.1rem 1.2rem 1.3rem;
`;

const DeliverTo = styled.div`
  color: #6f7b76;

  font-size: 0.75rem;

  margin-bottom: 0.6rem;

  font-weight: 600;
`;

const AddressNameRow = styled.div`
  display: flex;

  align-items: center;

  gap: 0.7rem;

  margin-bottom: 0.55rem;

  strong {
    font-size: 1rem;
  }
`;

const AddressType = styled.span`
  font-size: 0.65rem;

  font-weight: 800;

  background: #e5eee8;

  color: #123f3d;

  padding: 0.25rem 0.55rem;

  border-radius: 3px;
`;

const AddressText = styled.p`
  margin: 0;

  max-width: 720px;

  color: #263d39;

  font-size: 0.9rem;

  line-height: 1.6;
`;

const MobileText = styled.p`
  margin: 0.55rem 0 0;

  color: #263d39;

  font-size: 0.88rem;
`;

const AddAddressBox = styled.div`
  margin: 1.1rem;

  padding: 1.1rem;

  border: 1px dashed #78938c;

  display: flex;

  align-items: center;

  gap: 1rem;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    background: #eef4ef;

    border-color: #123f3d;
  }
`;

const Plus = styled.div`
  width: 38px;

  height: 38px;

  border: 1px solid #123f3d;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.5rem;
`;

const AddAddressTitle = styled.div`
  font-weight: 800;

  font-size: 0.9rem;
`;

const AddAddressText = styled.div`
  margin-top: 0.2rem;

  color: #6d7974;

  font-size: 0.78rem;
`;

const AddressForm = styled.form`
  padding: 1.2rem;
`;

const FormRow = styled.div`
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 1rem;

  margin-bottom: 1rem;

  &:has(> :nth-child(3)) {
    grid-template-columns:
      repeat(3, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr !important;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;

  margin-bottom: 0.45rem;

  color: #506762;

  font-size: 0.72rem;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.04em;
`;

const Input = styled.input`
  width: 100%;

  box-sizing: border-box;

  padding: 0.8rem 0.85rem;

  border: 1px solid #c8d2cd;

  background: #fffdf8;

  color: #123f3d;

  outline: none;

  font-size: 0.88rem;

  &:focus {
    border-color: #123f3d;

    box-shadow:
      0 0 0 2px
        rgba(18, 63, 61, 0.08);
  }
`;

const TextArea = styled.textarea`
  width: 100%;

  box-sizing: border-box;

  resize: vertical;

  padding: 0.8rem 0.85rem;

  border: 1px solid #c8d2cd;

  background: #fffdf8;

  color: #123f3d;

  outline: none;

  font-size: 0.88rem;

  font-family: inherit;

  &:focus {
    border-color: #123f3d;

    box-shadow:
      0 0 0 2px
        rgba(18, 63, 61, 0.08);
  }
`;

const AddressTypeWrapper = styled.div`
  margin-top: 0.3rem;
`;

const AddressTypeOptions = styled.div`
  display: flex;

  gap: 1rem;
`;

const TypeLabel = styled.label`
  display: flex;

  align-items: center;

  gap: 0.45rem;

  color: #123f3d;

  font-size: 0.8rem;

  font-weight: 700;

  cursor: pointer;
`;

const Radio = styled.input`
  accent-color: #123f3d;

  cursor: pointer;
`;

const FormActions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: 0.7rem;

  margin-top: 1.2rem;
`;

const CancelButton = styled.button`
  border: 1px solid #b8c3be;

  background: transparent;

  color: #506762;

  padding: 0.8rem 1.5rem;

  font-size: 0.76rem;

  font-weight: 800;

  cursor: pointer;
`;

const SaveButton = styled.button`
  border: none;

  background: #123f3d;

  color: #f8f5ec;

  padding: 0.8rem 1.7rem;

  font-size: 0.76rem;

  font-weight: 800;

  letter-spacing: 0.04em;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    background: #1c5753;
  }
`;

/* =========================================
   PRODUCTS
========================================= */

const Products = styled.div`
  padding: 0 1.1rem;
`;

const ProductCard = styled.div`
  position: relative;

  display: flex;

  gap: 1rem;

  padding: 1.3rem 0;

  border-bottom: 1px solid
    rgba(18, 63, 61, 0.1);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProductImageWrapper = styled.div`
  width: 125px;

  height: 145px;

  flex-shrink: 0;

  background: #eee9de;

  @media (max-width: 600px) {
    width: 100%;

    height: 220px;
  }
`;

const ProductImage = styled.img`
  width: 100%;

  height: 100%;

  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  margin: 0 0 0.55rem;

  font-size: 1rem;

  font-weight: 700;
`;

const ProductMeta = styled.p`
  margin: 0.2rem 0;

  color: #6b7873;

  font-size: 0.78rem;
`;

const PriceRow = styled.div`
  display: flex;

  align-items: center;

  gap: 0.7rem;

  margin-top: 0.7rem;
`;

const ProductPrice = styled.span`
  font-size: 1.05rem;

  font-weight: 800;
`;

const Rating = styled.span`
  background: #123f3d;

  color: #f8f5ec;

  padding: 0.25rem 0.45rem;

  font-size: 0.7rem;
`;

const QuantityRow = styled.div`
  display: flex;

  align-items: center;

  gap: 0.7rem;

  margin-top: 1rem;
`;

const QuantityLabel = styled.span`
  color: #65736e;

  font-size: 0.78rem;
`;

const QuantityBox = styled.div`
  display: flex;

  align-items: center;

  border: 1px solid #c8d2cd;
`;

const QuantityButton = styled.button`
  width: 31px;

  height: 30px;

  border: none;

  background: #eef3ef;

  color: #123f3d;

  font-size: 1rem;

  cursor: pointer;

  &:hover {
    background: #dfeae4;
  }
`;

const Quantity = styled.span`
  width: 32px;

  text-align: center;

  font-size: 0.82rem;

  font-weight: 700;
`;

const RemoveButton = styled.button`
  border: none;

  background: transparent;

  color: #123f3d;

  font-size: 0.7rem;

  font-weight: 800;

  cursor: pointer;

  &:hover {
    color: #d99a78;
  }
`;

const ItemTotal = styled.div`
  font-size: 1rem;

  font-weight: 800;

  white-space: nowrap;

  @media (max-width: 600px) {
    position: absolute;

    right: 0;

    top: 1.3rem;
  }
`;

/* =========================================
   PAYMENT
========================================= */

const PaymentOptions = styled.div`
  padding: 0.5rem 1rem 1rem;
`;

const PaymentOption = styled.div`
  display: flex;

  align-items: flex-start;

  gap: 0.7rem;

  padding: 0.9rem;

  border: 1px solid
    ${(props) =>
      props.$selected
        ? "#123F3D"
        : "#d0d8d3"};

  background: ${(props) =>
    props.$selected
      ? "#eef4ef"
      : "#fffdf8"};

  margin-top: 0.55rem;

  cursor: pointer;

  transition: 0.2s;
`;

const PaymentContent = styled.div`
  flex: 1;
`;

const PaymentTitle = styled.div`
  font-weight: 800;

  font-size: 0.82rem;
`;

const PaymentDescription = styled.div`
  color: #6b7873;

  font-size: 0.7rem;

  margin-top: 0.25rem;

  line-height: 1.4;
`;

/* =========================================
   PRICE DETAILS
========================================= */

const PriceCard = styled.div`
  background: #f8f5ec;

  border: 1px solid
    rgba(18, 63, 61, 0.1);
`;

const PriceTitle = styled.div`
  min-height: 62px;

  display: flex;

  align-items: center;

  gap: 0.7rem;

  padding: 0 1.1rem;

  border-bottom: 1px solid
    rgba(18, 63, 61, 0.1);

  font-size: 0.82rem;

  font-weight: 800;

  letter-spacing: 0.08em;
`;

const PriceContent = styled.div`
  padding: 1.1rem;
`;

const PriceLine = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 1rem;

  color: #415650;

  font-size: 0.82rem;

  span:last-child {
    color: #123f3d;

    font-weight: 700;
  }
`;

const FreeText = styled.span`
  color: #23804d !important;
`;

const FreeDelivery = styled.div`
  background: #e0f1e7;

  color: #247349;

  padding: 0.7rem;

  font-size: 0.72rem;

  font-weight: 700;

  margin-bottom: 1rem;
`;

const Divider = styled.div`
  height: 1px;

  background: rgba(18, 63, 61, 0.16);

  margin: 1rem 0;
`;

const TotalLine = styled.div`
  display: flex;

  justify-content: space-between;

  font-size: 1rem;

  font-weight: 800;
`;

const Savings = styled.div`
  margin-top: 1rem;

  background: #dceee5;

  color: #247349;

  padding: 0.7rem;

  font-size: 0.7rem;

  font-weight: 700;

  line-height: 1.4;
`;

const PaymentButton = styled.button`
  width: 100%;

  border: none;

  background: #123f3d;

  color: #f8f5ec;

  padding: 1rem;

  margin-top: 1rem;

  font-size: 0.82rem;

  font-weight: 800;

  letter-spacing: 0.08em;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    background: #1c5753;

    transform: translateY(-1px);
  }
`;

const SecurityCard = styled.div`
  background: #eef4ef;

  border: 1px solid
    rgba(18, 63, 61, 0.08);

  padding: 1rem;

  display: flex;

  gap: 0.7rem;
`;

const SecurityIcon = styled.div`
  font-size: 1rem;
`;

const SecurityContent = styled.div`
  flex: 1;
`;

const SecurityTitle = styled.div`
  font-size: 0.75rem;

  font-weight: 800;
`;

const SecurityText = styled.div`
  color: #697873;

  font-size: 0.68rem;

  line-height: 1.5;

  margin-top: 0.3rem;
`;

/* =========================================
   EMPTY CART
========================================= */

const EmptyPage = styled.div`
  min-height: 100vh;

  background: #eaf2ec;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 2rem;
`;

const EmptyCard = styled.div`
  width: min(420px, 100%);

  text-align: center;

  background: #f8f5ec;

  padding: 3rem 2rem;

  border: 1px solid
    rgba(18, 63, 61, 0.1);

  h2 {
    margin: 1rem 0 0.5rem;

    color: #123f3d;
  }

  p {
    color: #687771;

    font-size: 0.85rem;

    margin-bottom: 1.5rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
`;

const ShopButton = styled.button`
  border: none;

  background: #123f3d;

  color: #f8f5ec;

  padding: 0.9rem 1.5rem;

  font-size: 0.75rem;

  font-weight: 800;

  cursor: pointer;
`;

export default Checkout;