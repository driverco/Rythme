import React from "react";
import { useTranslation } from "react-i18next";
import pageHeader from "../common/PageHeader";
import Section from "../common/Section";


function Home() {
    const { t } = useTranslation("home");
    return (
        <React.Fragment>
            {pageHeader(t("welcomeTitle"),t("welcomeSubtitle"))}
            {Section("0",t("section1.title"),t("section1.content"),"kid_drums.jpg","practiceSelect", t("section1.linkDesc"))}
            {Section("1",t("section2.title"),t("section2.content"),"kid_drums.jpg","definitions", t("section2.linkDesc"))}
            {Section("0",t("section3.title"),t("section3.content"),"kid_drums.jpg","multipad", t("section3.linkDesc"))}
            {Section("1",t("section4.title"),t("section4.content"),"Poster.jpg","about", t("section4.linkDesc"))}
        </React.Fragment>
    );
}

export default Home;
