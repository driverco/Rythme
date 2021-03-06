import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import defCard from "../common/DefCard";
import pageHeader from "../common/PageHeader";
import keyboardMultipadImg from "../../img/keyboardMultipadFinal.png";
import arduinoMultipadImg from "../../img/arduinoMultipadFinal.png";


function Multipad() {
    const { t } = useTranslation("multipad");
    return (
        <React.Fragment>
            {pageHeader(t("welcomeTitle"), t("welcomeSubtitle"))}
            <Container fluid={false}>
                <Row>
                    <Col sm="6">
                        {defCard(t("keyboardTitle"), t("keyboardContent"), t("knowmore"), "keyboardMultipad", keyboardMultipadImg, false)}
                    </Col>
                    <Col sm="6">
                        {defCard(t("arduinoTitle"), t("arduinoContent"), t("knowmore"), "arduinoMultipad", arduinoMultipadImg, false)}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default Multipad;
