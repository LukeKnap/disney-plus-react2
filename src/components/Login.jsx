import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Tento řádek je potřebný z důvodů přístupnosti

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isCompleteEmail, setIsCompleteEmail] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsCompleteEmail(event.target.value !== "");
    setIsValidEmail(validateEmail(event.target.value));
  };

  const handleSubscribe = () => {
    if (isValidEmail && isCompleteEmail) {
      setIsSubscribed(true);
      setModalMessage("You have successfully subscribed to our newsletter!");
      setModalIsOpen(true);
      setTimeout(() => {
        setModalIsOpen(false);
        setIsSubscribed(false);
      }, 3000);
    } else {
      setModalMessage("Please enter a valid email address.");
      setModalIsOpen(true);
    }
  };

  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt="" />
          <SignUpContainer>
            <EmailInput
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              isValid={isValidEmail}
              isComplete={isCompleteEmail}
            />
            <SignUpButton onClick={handleSubscribe}>
              SUBSCRIBE TO OUR NEWSLETTER
            </SignUpButton>
          </SignUpContainer>
          <Description>
            Get 12 months for the price of 10 with an annual subscription,
            compared to paying monthly, on your Premium or Standard plan.
          </Description>
          <Description2>
            *Effective at the end of the billing period. Subscription required.
          </Description2>
          <CTALogoTwo src="/images/cta-logo-two.png" alt="" />
        </CTA>
        <BgImage />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Subscription Modal"
          style={{
            content: {
              textAlign: "center",
              width: "50%",
              height: "fit-content",
              margin: "auto",
            },
          }}
        >
          <ModalContent>
            <ModalText>
              {isSubscribed
                ? "Congratulations! You have successfully subscribed to our newsletter."
                : "Oops! Something went wrong. Please try again later."}
            </ModalText>
            <ModalCloseButton onClick={() => setModalIsOpen(false)}>
              Close
            </ModalCloseButton>
          </ModalContent>
        </Modal>
      </Content>
    </Container>
  );
};


const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/BG-disney-plus.jpeg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const EmailInput = styled.input`
  width: 70%;
  padding: 16.5px;
  border: none;
  border-radius: 4px;
  background-color: #31343e;
  color: white;
  box-sizing: border-box;
  margin: 0;
  border: ${(props) =>
    props.isComplete
      ? props.isValid
        ? "none"
        : "2px solid red"
      : "2px solid orange"};
`;

const SignUpButton = styled.button`
  width: 70%;
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  padding: 16.5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  margin: 0;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 16px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  font-weight: bold;
`;

const Description2 = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 10px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
`;

const ModalContent = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const ModalText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #0063e5;
  margin-bottom: 20px;
`;

const ModalCloseButton = styled.button`
  background-color: #0063e5;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0483ee;
  }
`;

export default Login;
