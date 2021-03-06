import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup, Button, InputGroup, InputGroupAddon, Input, Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faList, faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeBPM, playStop, togglePatternView, PLAYING, toggleDemoPlay, setRepeatTimes, FINISHED } from "../../redux/actions/ControllerActions";
import Patterns from "./Patterns";
import { Container } from "react-bootstrap";

function Controller() {
    const bpm = useSelector((Store) => Store.ControllerReducer.bpm);
    const playingState = useSelector((Store) => Store.ControllerReducer.playingState);
    const repeatTimes = useSelector((Store) => Store.ControllerReducer.repeatTimes);
    const pattern = useSelector((Store) => Store.ControllerReducer.pattern);
    const patternViewOpen = useSelector((Store) => Store.ControllerReducer.patternViewOpen);
    const demoPlay = useSelector((Store) => Store.ControllerReducer.demoPlay);
    const dispatch = useDispatch();
    const { t } = useTranslation("player");
    const [bpmInput, setBPM] = useState(bpm);
    const [repeatsInput, setRepeats] = useState(repeatTimes);


    const setBPMOnChange = (e) => {
        dispatch(changeBPM(e.currentTarget.value));
        setBPM(bpm);
    };
    const setRepeatsOnChange = (e) => {
        dispatch(setRepeatTimes(e.currentTarget.value));
        setRepeats(repeatTimes);
    };
    const onclickDemoPLay = (e) => {
        dispatch(toggleDemoPlay());
    };
    


    return (
        <React.Fragment>
            <Container>
                <ButtonGroup size="lg">
                    <Button onClick={() => dispatch(playStop())}>
                        {(playingState === PLAYING ? <FontAwesomeIcon icon={faPause} /> : (playingState === FINISHED ? <FontAwesomeIcon icon={faStepBackward} /> : <FontAwesomeIcon icon={faPlay} />))}
                    </Button>
                    <InputGroup size="lg">
                        <Input id="bpm" placeholder="Speed" min={20} max={300} type="number" step="1" bsSize="lg" disabled={playingState === PLAYING} value={bpmInput} onChange={setBPMOnChange} />
                        <InputGroupAddon addonType="append">BPM</InputGroupAddon>
                    </InputGroup>
                    <InputGroup size="lg">
                        <Input placeholder="Pattern" type="string" bsSize="lg" disabled value={pattern.name} />
                    </InputGroup>
                    <Button disabled={playingState === PLAYING} onClick={() => dispatch(togglePatternView())}>
                        <FontAwesomeIcon icon={faList} />
                    </Button>
                    <InputGroup size="lg">
                        <Input id="repeatTimes" placeholder="Speed" disabled={playingState === PLAYING} min={1} max={20} type="number" step="1" bsSize="lg" value={repeatsInput} onChange={setRepeatsOnChange} />
                        <InputGroupAddon addonType="append">{t("repeatTimes")}</InputGroupAddon>
                    </InputGroup>
                    <ButtonGroup size="lg">
                        <Button outline color="secondary" disabled={playingState === PLAYING||playingState === FINISHED} onClick={onclickDemoPLay} active={demoPlay}>{t("demoPlay")}</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Container>
            <Collapse isOpen={patternViewOpen}>
                {new Patterns()}
            </Collapse>
        </React.Fragment >
    );
}

export default Controller;
