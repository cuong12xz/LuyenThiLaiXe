import React, { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import "./1.css"
import "./2.css"
import axios from "axios"
import { Container } from "react-bootstrap"

export default function ThiSatHach() {
    const [start, setStart] = useState(false)
    const timeId = useRef()
    const clock = useRef()
    const [final, setFinal] = useState({ SoCauDung: 0, SoCauSai: 0, KetQua: "" })
    const [searchParams, setSearchParams] = useSearchParams()
    const [answer, setAnswer] = useState({}) //
    const [finish, setFinish] = useState(false)
    const [review, setReview] = useState(false)
    const [count, setCount] = useState({ min: 20, sec: 0 })
    const handleStart = () => {
        setStart(!start)
        timeId.current = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount.min === 0 && prevCount.sec === 0) {
                   handleStop()
                    return { ...prevCount }
                }
                if (prevCount.sec === 0) {
                    return { min: prevCount.min - 1, sec: 59 }
                }
                return { ...prevCount, sec: prevCount.sec - 1 }
            })
        }, 300)
    }
    useEffect(()=> {
        if(count.min===0 && count.sec === 0) {
            handleEnd()
        }
    }, [count])
    const handleOclock = () => {
        var SoCauDung = 0
        var SoCauSai = 0
        var KetQua = ""
        for (let index = 0; index < chitietdethi.length; index++) {
            let id = chitietdethi[index].id
            if (answer[id] && "DapAn" + chitietdethi[index].DapAnDung === answer[id].answer) {
                SoCauDung++
            } else {
                if (chitietdethi[index].CauDiemLiet === 1) {
                    KetQua = "Không đạt - Sai câu điểm liệt - Hãy thử lại"
                }
                SoCauSai++
            }
        }

        // dieu kien khong dat

        if (KetQua === "") {
            if (SoCauDung < 21) KetQua = "Không đạt - hãy thử lại"
            else KetQua = "Dat"
        }

        setFinal(() => {
            return { SoCauDung, SoCauSai, KetQua }
        })
    }
    const handleReview = () => {
        setReview(false)
    }
    // console.log(count)
    const handleStop = () => {
        clearInterval(timeId.current)
    }
    const [chitietdethi, setChiTietDeThi] = useState([])
    const handleEnd = () => {
        handleStop()

        // kiem tra ket qua bai lam
        handleOclock()
        setFinish(true)
        setReview(true)
    }

    useEffect(() => {
        const getDataName = async () => {
            let idDeThi = searchParams.get("id")
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/chitietdethi", { params: { id: idDeThi } })
            setChiTietDeThi(response.data.result)
            setQuestion({ ...response.data.result[0], index: 1 }) //câu 1 hiện ra đầu tiên
        }
        getDataName()
    }, [])
    const [question, setQuestion] = useState([])
    const onClickQuestionHandler = (chooseItem) => {
        setQuestion(() => {
            const a = chitietdethi.find((element) => element.id === chooseItem.id)
            const b = { ...a, index: chooseItem.index }
            return b
        })
    }
    const onClickPrevQuestion = (e) => {
        e.preventDefault()
        setQuestion(() => {
            const result = chitietdethi[question.index - 1]
            return { ...result, index: question.index - 1 }
        })
    }
    const onClickNextQuestion = (e) => {
        e.preventDefault()
        setQuestion(() => {
            const result = chitietdethi[question.index + 1]
            return { ...result, index: question.index + 1 }
        })
    }
    const handleChooseAnswer = (cauhoi, answer) => {
        //b2
        setAnswer((as) => {
            console.log("da xet");
            var arrAs = { ...as }
            arrAs[cauhoi.idCH] = { idDT: cauhoi.idDT, idCH: cauhoi.idCH, answer: answer }
            return arrAs
        })
    }
    /**
     *
     * @param {*} cauhoi du lieu cua cau hoi
     * @param {*} dapan dan an user chon (chua biet dung sai)
     */ let dem = 1
    const kiemTra = (cauhoi, dapan) => {
        //d2

        var format = "DapAn" + cauhoi.DapAnDung
        if (dapan[cauhoi.idCH] && format === dapan[cauhoi.idCH].answer) {
            return true
        }
        // for(let i=0;i<chitietdethi.length;i++){
        //    if("DapAn"+chitietdethi.DapAnDung===dapan[cauhoi.idCH].answer){
        //         dem+=dem
        //    }
        // }
        return false
    }
    return (
        <div className={start ? "container bg-white" : ""}>
            <div className="batdau">
                <div className="moi1" hidden={start ? "true" : ""}>
                    <button className="buttonbatdau" onClick={handleStart}>
                        Bắt đầu
                    </button>
                </div>
                <div>
                    <h1 class="text-center">PHẦN MỀM THI THỬ BẰNG LÁI XE A2 ONLINE 2022</h1>
                </div>
                <div className="panel panel-default xemlaibailam" hidden={review ? "" : "true"}>
                    <div class="panel-body">
                        <div style={{ marginBottom: "10px" }}>
                            <strong style={{ fontSize: "12pt", color: " blue" }}>Kết Quả Bài Làm</strong>
                        </div>
                        <p class="text-number">
                            Tên đề: <strong class="text-success text-number-exam">{question.TenDT}- 200 Câu Hỏi Thi A1</strong>
                        </p>
                        <div>
                            Số câu đúng: <span style={{ color: "red", fontWeight: "bold" }}>{final && final.SoCauDung ? final.SoCauDung : 0}</span>
                        </div>
                        <div>
                            Số câu sai: <span style={{ color: "red", fontWeight: "bold" }}>{final && final.SoCauSai ? final.SoCauSai : 0}</span>
                        </div>
                        <div>
                            Kết quả: <span style={{ color: "red", fontWeight: "bold" }}>{final && final.KetQua ? final.KetQua : ""}</span>
                        </div>
                        <div>
                            Chưa trả lời: <span>Tô màu trắng</span>
                        </div>
                        <div>
                            Đáp án sai: <span style={{ color: "red" }}>Tô màu đỏ</span>
                        </div>
                        <div>
                            Đáp án đúng: <span style={{ color: "blue" }}>Tô màu xanh</span>
                        </div>
                        <div>
                            Thời gian:{" "}
                            <span style={{ color: "blue" }}>
                                {count.min}:{count.sec < 10 ? `0${count.sec}` : count.sec}
                            </span>
                        </div>
                        <div class="panel panel-default" id="blockC">
                            <div class="panel-body-1">
                                <div class="text-center-1">
                                    <input
                                        class="btn-1 btn-primary btn-block choose"
                                        onClick={handleReview}
                                        type="submit"
                                        name="nopbai"
                                        id="nopbai"
                                        value="Xem lại bài làm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="row" hidden={review ? "true" : ""}>
                    <div class="col-md-4 col-sm-12 col-xs-12 margin1">
                        <div class="panel panel-default border1 " id="blockA">
                            <div class="panel-body">
                                <div style={{ marginBottom: "10px" }}>
                                    <strong style={{ fontSize: "12pt", color: "blue" }}>Câu hỏi | Đề số: {question.idDT} - 200 Câu Hỏi Thi Bằng Lái A1 </strong>
                                </div>

                                {chitietdethi.map((item, index) => {
                                    // var checked = ""
                                    // if (question) {
                                    //     checked = item.id === question.id ? "checked" : ""
                                    // }
                                    return (
                                        <label
                                            class={`btn btn-success btn-cauhoi clickcauhoi btn-1 ${answer[item.idCH] ? "choose" : ""}`} //b3
                                            style={{ background: `${finish ? (kiemTra(item, answer) ? "green" : "red") : ""}` }} //d1
                                            id="show1"
                                            data-id="data1">
                                            <input
                                                type="radio"
                                                id={"input" + item.id}
                                                name="chuyen_radio_tab_or_button"
                                                data-id="data1"
                                                // {...checked}
                                                onClick={() => onClickQuestionHandler({ id: item.id, index: index + 1 })}
                                                hidden
                                            />
                                            {index + 1}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-12 col-xs-12 border2" style={{ height: question.HinhAnh ? "" : "420px" }}>
                        <div class="panel panel-default" id="blockD">
                            <div class="panel-body">
                                <div>
                                    {question && (
                                        <div class="row content ndcauhoi" style={{ marginLeft: "10px", marginRight: "10px", display: "block" }} id="data1">
                                            <div class="row ">
                                                <div class="text-primary">
                                                    <div style={{ display: "block", width: "100%" }}>
                                                        Câu hỏi {question.index}:{question.NoiDungCH}
                                                    </div>
                                                </div>
                                                <div style={{ align: "justify" }}>
                                                    <strong>{question.question}</strong>
                                                </div>
                                                {question.HinhAnh && (
                                                    <img
                                                        style={{ width: "200px" }}
                                                        src={`${process.env.REACT_APP_API_HOST}/images/${question.HinhAnh}`}
                                                        alt="hinh"
                                                    />
                                                )}
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="cautraloi">
                                                        <label
                                                            class="checkbox-inline"
                                                            style={{
                                                                color: `${
                                                                    finish && "DapAnA" === "DapAn" + question.DapAnDung
                                                                        ? "blue"
                                                                        : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnA"
                                                                        ? "red"
                                                                        : ""
                                                                }`, //c2
                                                            }}>
                                                            <input
                                                                class="question radio-answer"
                                                                disabled={`${finish ? "true" : ""}`}
                                                                checked={answer[question.idCH] && answer[question.idCH].answer === "DapAnA" ? "check" : ""}
                                                                type="radio"
                                                                onClick={() => handleChooseAnswer(question, "DapAnA")} //b1
                                                                name={question.idCH}
                                                                value={question.DapAnA}
                                                            />
                                                            {question.DapAnA}
                                                        </label>
                                                    </div>

                                                    <div class="cautraloi">
                                                        <label
                                                            class="checkbox-inline"
                                                            style={{
                                                                color: `${
                                                                    finish && "DapAnB" === "DapAn" + question.DapAnDung
                                                                        ? "blue"
                                                                        : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnB"
                                                                        ? "red"
                                                                        : ""
                                                                }`,
                                                            }}>
                                                            <input
                                                                disabled={`${finish ? "true" : ""}`}
                                                                class="question radio-answer"
                                                                type="radio"
                                                                name={question.idCH}
                                                                value={question.DapAnB}
                                                                checked={answer[question.idCH] && answer[question.idCH].answer === "DapAnB" ? "check" : ""}
                                                                onClick={() => handleChooseAnswer(question, "DapAnB")}
                                                            />
                                                            {question.DapAnB}
                                                        </label>
                                                    </div>
                                                    {question.DapAnC && (
                                                        <div class="cautraloi">
                                                            <label
                                                                class="checkbox-inline"
                                                                style={{
                                                                    color: `${
                                                                        finish && "DapAnC" === "DapAn" + question.DapAnDung
                                                                            ? "blue"
                                                                            : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnC"
                                                                            ? "red"
                                                                            : ""
                                                                    }`,
                                                                }}>
                                                                <input
                                                                    disabled={`${finish ? "true" : ""}`}
                                                                    class="question radio-answer"
                                                                    type="radio"
                                                                    name={question.idCH}
                                                                    value={question.DapAnC}
                                                                    checked={answer[question.idCH] && answer[question.idCH].answer === "DapAnC" ? "check" : ""}
                                                                    onClick={() => handleChooseAnswer(question, "DapAnC")}
                                                                />
                                                                {question.DapAnC}
                                                            </label>
                                                        </div>
                                                    )}
                                                    {question.DapAnD && (
                                                        <div class="cautraloi">
                                                            <label
                                                                class="checkbox-inline"
                                                                style={{
                                                                    color: `${
                                                                        finish && "DapAnD" === "DapAn" + question.DapAnDung
                                                                            ? "blue"
                                                                            : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnD"
                                                                            ? "red"
                                                                            : ""
                                                                    }`,
                                                                }}>
                                                                <input
                                                                    disabled={`${finish ? "true" : ""}`}
                                                                    class="question radio-answer"
                                                                    type="radio"
                                                                    name={question.idCH}
                                                                    value={question.DapAnD}
                                                                    checked={answer[question.idCH] && answer[question.idCH].answer === "DapAnD" ? "check" : ""}
                                                                    onClick={() => handleChooseAnswer(question, "DapAnD")}
                                                                />
                                                                {question.DapAnD}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {finish && (
                                                <div class="col-md-12 dapan2">
                                                    <strong>
                                                        <span>Giải thích:</span>
                                                    </strong>
                                                    <p>{question.GiaiThich}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <ul class="pager next2">
                                    <li class="previous cautruoc">
                                        <a href="" onClick={onClickPrevQuestion}>
                                            Câu trước
                                        </a>
                                    </li>
                                    <li class="next causau">
                                        <a href="" onClick={onClickNextQuestion}>
                                            Câu tiếp theo
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="clear" />
                    <div class="col-md-4 col-sm-12 col-xs-12 ">
                        <div className="border1">
                            <div class="panel panel-primary panel-heading " id="">
                                <strong style={{ fontSize: "12pt", color: "blue" }}>
                                    Thời gian còn lại:{" "}
                                    <span id="countdown" class="timer">
                                        {count.min}:{count.sec < 10 ? `0${count.sec}` : count.sec}
                                    </span>
                                </strong>
                            </div>
                        </div>

                        <div class="panel panel-default" id="blockC">
                            <div class="panel-body-1">
                                <div class="text-center-1">
                                    <input
                                        class="btn-1 btn-primary btn-block choose"
                                        type="submit"
                                        onClick={handleEnd} //c1
                                        name="nopbai"
                                        id="nopbai"
                                        value="KẾT THÚC BÀI THI"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
