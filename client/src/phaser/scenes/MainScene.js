import Phaser from "phaser";
import SnareImg from "../assets/snare100.png";
import KickImg from "../assets/kickdrum100.png";
import FloorImg from "../assets/floordrum100.png";
import CymbalImg from "../assets/cymbal100.png";
import CircleImg from "../assets/circle50.png";
import BgSquareImg from "../assets/bg.png";
import ClickAudio from "../assets/audio/click.wav";
import SnareAudioMp3 from "../assets/audio/snare.mp3";
import SnareAudioOgg from "../assets/audio/snare.ogg";
import SnareAudioWav from "../assets/audio/snare.wav";
import KickAudioMp3 from "../assets/audio/kick.mp3";
import KickAudioOgg from "../assets/audio/kick.ogg";
import KickAudioWav from "../assets/audio/kick.wav";
import CymbalAudioMp3 from "../assets/audio/cymbal.mp3";
import CymbalAudioOgg from "../assets/audio/cymbal.ogg";
import CymbalAudioWav from "../assets/audio/cymbal.wav";
import FloorAudioMp3 from "../assets/audio/floor.mp3";
import FloorAudioOgg from "../assets/audio/floor.ogg";
import FloorAudioWav from "../assets/audio/floor.wav";
import Store from "../../redux/Store";
import { STOP, PLAYING, PAUSE } from "../../redux/actions/ControllerActions";

var playingState, changeState, currtime, timePLay, nextClickTime, bpm, restartTime;

let beats, inst1, inst2, inst3, inst4, audio1, audio2, audio3, audio4;

class MainScene extends Phaser.Scene {

  constructor() {
    super({
      key: "MainScene",
      active: true,
    });
  }
  preload() {
    this.load.image("snareimg", SnareImg);
    this.load.image("kickimg", KickImg);
    this.load.image("floorimg", FloorImg);
    this.load.image("cymbalimg", CymbalImg);
    this.load.image("circleimg", CircleImg);
    this.load.image("bgsquareimg", BgSquareImg);


    this.load.audio("snareAudio", [SnareAudioOgg, SnareAudioMp3, SnareAudioWav]);
    this.load.audio("kickAudio", [KickAudioOgg, KickAudioMp3, KickAudioWav]);
    this.load.audio("cymbalAudio", [CymbalAudioOgg, CymbalAudioMp3, CymbalAudioWav]);
    this.load.audio("floorAudio", [FloorAudioOgg, FloorAudioMp3, FloorAudioWav]);
    this.load.audio("clickAudio", ClickAudio);
  }

  create() {
    beats = this.physics.add.group();
    this.pattern = Store.getState().ControllerReducer.pattern;
    bpm = Store.getState().ControllerReducer.bpm;
    Store.subscribe(() => {
      playingState = Store.getState().ControllerReducer.playingState;
      bpm = Store.getState().ControllerReducer.bpm;
      this.pattern = Store.getState().ControllerReducer.pattern;
      if (playingState === STOP) {
        this.loadPattern();
        timePLay = 0;
        nextClickTime = 0;
        this.calcNextClickTime();
      }
    });
    playingState = Store.getState().ControllerReducer.playingState;
    this.pattern = Store.getState().ControllerReducer.pattern;
    changeState = playingState;
    this.widthBoard = 235 + 480;
    inst1 = this.physics.add.sprite(110, 5, "bgsquareimg").setInteractive();
    inst2 = this.physics.add.sprite(110, 110, "bgsquareimg").setInteractive();
    inst3 = this.physics.add.sprite(110, 215, "bgsquareimg").setInteractive();
    inst4 = this.physics.add.sprite(110, 320, "bgsquareimg").setInteractive();
    this.timeText = this.add.text(100, 200);
    timePLay = 0;
    nextClickTime = 0;
    restartTime = 0;
    this.calcNextClickTime();
    /*this.physics.add.overlap([inst1,inst2,inst3,inst4], beats, this.beatPlay, null, this);*/

    inst1.setOrigin(0);
    inst2.setOrigin(0);
    inst3.setOrigin(0);
    inst4.setOrigin(0);

    this.loadPattern();

  }

  update(time, delta) {
    if (changeState !== playingState) {
      if (playingState === PLAYING && restartTime > (60000 * 3 / bpm)) {
        changeState = playingState;
        this.setSpeed();
      }
      if (playingState === STOP || playingState === PAUSE) {
        restartTime = 0;
        this.setSpeed();
        changeState = playingState;
      }
    }
    if (playingState === PLAYING)
      if (restartTime > (60000 * 3 / bpm)) {
        timePLay += delta;
      } else {
        restartTime = restartTime + delta;
      }
    if (restartTime+timePLay > nextClickTime) {
      this.calcNextClickTime();
      this.clickAudio.play();
    }
    this.timeText.depth = 1;
    this.timeText.setText('Time: ' + time + '\nDelta: ' + delta + '\ntimePLay: ' + timePLay + '\nrestartTime: ' + restartTime+ '\nnextClickTime: ' + nextClickTime);

  }
  calcNextClickTime() {
    nextClickTime = nextClickTime + (60000 / bpm);
  }

  loadPattern() {
    this.clearObjArray();
    this.createRects();
    this.pattern.instruments.forEach((instrument, index) => {
      switch (instrument.type) {
        case "snare": inst1.audio = this.sound.add("snareAudio"); this.loadInst(inst1, this.snareAudio, "snare", index, Store.getState().ControllerReducer.keyPress[index]); break;
        case "kick": inst2.audio = this.sound.add("kickAudio"); this.loadInst(inst2, this.kickAudio, "kick", index, Store.getState().ControllerReducer.keyPress[index]); break;
        case "cymbal": inst3.audio = this.sound.add("cymbalAudio"); this.loadInst(inst3, this.cymbalAudio, "cymbal", index, Store.getState().ControllerReducer.keyPress[index]); break;
        case "floor": inst4.audio = this.sound.add("floorAudio"); this.loadInst(inst4, this.floorAudio, "floor", index, Store.getState().ControllerReducer.keyPress[index]); break;
        default: break;
      }
      this.loadPatternCode(index, instrument.patternCode);
    });
    this.clickAudio = this.sound.add("clickAudio");
    this.physics.add.overlap([inst1, inst2, inst3, inst4], beats, this.beatPlay, null, this);

  }

  loadPatternCode(patternIndex, patternCode) {
    const patternCodeArray = Array.from(patternCode);
    patternCodeArray.forEach((beat, index) => {
      if (beat === "1") beats.create(this.widthBoard + 120 * index, 55 + (105 * patternIndex), "circleimg");

    });
  }
  beatPlay(inst, beat) {
    beat.setActive(false).setVisible(false);
    beat.disableBody(true, true);
    inst.audio.play();
    console.log('Elapsed seconds: ' + (timePLay+restartTime));
  }

  loadInst(inst, audio, type, index, keyPress) {
    inst = this.physics.add.sprite(110, 5 + (105 * index), type + "img").setInteractive();
    inst.setActive(true).setVisible(true);
    inst.setOrigin(0);
    inst.index = index;
    audio = this.sound.add(type + "Audio");
    inst.on("pointerdown", (pointer) => {
      console.log("playingState:" + playingState + ":changeState:" + changeState);
      audio.play();
      inst.setTint(0xff0000);
    });
    inst.on("pointerout", (pointer) => {
      inst.clearTint();
    });
    inst.on("pointerup", (pointer) => {
      inst.clearTint();
    });
    var style = { font: "bold 90px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    this.add.text(20, 10 + (105 * index), keyPress, style);
    this.input.keyboard.on("keydown-" + keyPress, function (event) {
      audio.play();
    });
  }

  clearObjArray() {
    beats.clear(true, true);
  }

  setSpeed() {
    console.log("set speed");
    const speed = (playingState === PLAYING ? -(bpm * 4) : 0);
    beats.children.iterate((objbeat) => {
      objbeat.body.velocity.x = speed;
    });
  }

  /*create the rectangle of the background*/
  createRects() {
    var container1 = this.add.rectangle(5, 5, 990, 100, 0x000000);
    var container2 = this.add.rectangle(5, 110, 990, 100, 0x000000);
    var container3 = this.add.rectangle(5, 215, 990, 100, 0x000000);
    var container4 = this.add.rectangle(5, 320, 990, 100, 0x000000);
    container1.setOrigin(0);
    container2.setOrigin(0);
    container3.setOrigin(0);
    container4.setOrigin(0);
    var lineCenter1 = this.add.rectangle(210, 55, 790, 2, 0xaacccc);
    var lineCenter2 = this.add.rectangle(210, 160, 790, 2, 0xaacccc);
    var lineCenter3 = this.add.rectangle(210, 265, 790, 2, 0xaacccc);
    var lineCenter4 = this.add.rectangle(210, 370, 790, 2, 0xaacccc);
    lineCenter1.setOrigin(0);
    lineCenter2.setOrigin(0);
    lineCenter3.setOrigin(0);
    lineCenter4.setOrigin(0);
    var linedivide1 = this.add.rectangle(105, 0, 5, 450, 0xffffff);
    linedivide1.setOrigin(0);
    var linedivide2 = this.add.rectangle(210, 0, 5, 450, 0xffffff);
    linedivide2.setOrigin(0);

  }

}
export default MainScene;