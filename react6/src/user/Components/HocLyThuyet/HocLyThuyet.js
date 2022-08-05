import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import "./1.css"
import "./2.css"
import axios from "axios"

export default function HocLyThuyet() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [chitietdethi, setChiTietDeThi] = useState([])
    const [answer, setAnswer] = useState({}) //
    const [finish, setFinish] = useState(false)
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

    // const onClickQuestionHandler = (chooseItem) => {
    //     setQuestion(() => {
    //         const a = chitietdethi.find((element) => element.id === chooseItem.id)
    //         const b = { ...a, index: chooseItem.index }
    //         return b
    //     })
    // }
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
            console.log('====================================');
            console.log(cauhoi);
            console.log('====================================');
            var arrAs = { ...as }
            arrAs[cauhoi.idCH] = { idDT: cauhoi.idDT, idCH: cauhoi.idCH, answer: answer }
            return arrAs
        })
        setFinish(true)
    }
    /**
     *
     * @param {*} cauhoi du lieu cua cau hoi
     * @param {*} dapan dan an user chon (chua biet dung sai)
     */
    const kiemTra = (cauhoi, dapan) => {
        //d2
        var format = "DapAn" + cauhoi.DapAnDung
        if (dapan[cauhoi.idCH] && format === dapan[cauhoi.idCH].answer) {
            return true
        }
        return false
    }
    console.log(question.id)
    return (
        <div className="container bg-white">
            <div>
                <h1 className="text-center">PHẦN MỀM THI THỬ BẰNG LÁI XE A2 ONLINE 2022</h1>
            </div>
            <div className="row">
                

                <div className="col-md-8 col-sm-12 col-xs-12 border2" style={{ height: question.HinhAnh ? "" : "420px" }}>
                    <div className="panel panel-default" id="blockD">
                        <div className="panel-body">
                            <div>
                                {question && (
                                    <div className="row content ndcauhoi" style={{ marginLeft: "10px", marginRight: "10px", display: "block" }} id="data1">
                                        <div className="row ">
                                            <div className="text-primary">
                                                <strong>
                                                    Câu hỏi {question.index}:{question.NoiDungCH}
                                                </strong>
                                            </div>
                                            <div style={{ align: "justify" }}>
                                                <strong>{question.question}</strong>
                                            </div>

                                            {question.HinhAnh && (
                                                <img
                                                    style={{ maxHeight: "300px" }}
                                                    src={`${process.env.REACT_APP_API_HOST}/images/${question.HinhAnh}`}
                                                    alt="hinh"
                                                />
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="cautraloi">
                                                    <label
                                                        className="checkbox-inline"
                                                        style={{
                                                            color: `${
                                                                answer[question.idCH] && "DapAnA" === "DapAn" + question.DapAnDung
                                                                    ? "green"
                                                                    : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnA"
                                                                    ? "red"
                                                                    : ""
                                                            }`, //c2
                                                        }}>
                                                        <input
                                                            className="question radio-answer"
                                                            disabled={`${answer[question.idCH] ? "true" : ""}`}
                                                            checked={answer[question.idCH] && answer[question.idCH].answer === "DapAnA" ? "check" : ""}
                                                            type="radio"
                                                            onClick={() => handleChooseAnswer(question, "DapAnA")} //b1
                                                            data-id={question.idCH}
                                                            name={question.idCH}
                                                            value={question.DapAnA}
                                                        />
                                                        {question.DapAnA}
                                                    </label>
                                                </div>
                                                <div className="cautraloi">
                                                    <label
                                                        className="checkbox-inline"
                                                        style={{
                                                            color: `${
                                                                answer[question.idCH] && "DapAnB" === "DapAn" + question.DapAnDung
                                                                    ? "green"
                                                                    : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnB"
                                                                    ? "red"
                                                                    : ""
                                                            }`,
                                                        }}>
                                                        <input
                                                            disabled={`${answer[question.idCH] ? "true" : ""}`}
                                                            className="question radio-answer"
                                                            type="radio"
                                                            data-id={question.idCH}
                                                            name={question.idCH}
                                                            value={question.DapAnB}
                                                            checked={answer[question.idCH] && answer[question.idCH].answer === "DapAnB" ? "check" : ""}
                                                            onClick={() => handleChooseAnswer(question, "DapAnB")}
                                                        />
                                                        {question.DapAnB}
                                                    </label>
                                                </div>
                                                <div className="cautraloi">
                                                    <label
                                                        className="checkbox-inline"
                                                        style={{
                                                            color: `${
                                                                answer[question.idCH] && "DapAnC" === "DapAn" + question.DapAnDung
                                                                    ? "green"
                                                                    : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnC"
                                                                    ? "red"
                                                                    : ""
                                                            }`,
                                                        }}>
                                                        <input
                                                            disabled={`${answer[question.idCH] ? "true" : ""}`}
                                                            className="question radio-answer"
                                                            type="radio"
                                                            data-id={question.idCH}
                                                            name={question.idCH}
                                                            value={question.DapAnC}
                                                            checked={answer[question.idCH] && answer[question.idCH].answer === "DapAnC" ? "check" : ""}
                                                            onClick={() => handleChooseAnswer(question, "DapAnC")}
                                                        />
                                                        {question.DapAnC}
                                                    </label>
                                                </div>
                                                {question.DapAnD && (
                                                    <div className="cautraloi">
                                                        <label
                                                            className="checkbox-inline"
                                                            style={{
                                                                color: `${
                                                                    answer[question.idCH] && "DapAnD" === "DapAn" + question.DapAnDung
                                                                        ? "green"
                                                                        : finish && answer[question.idCH] && answer[question.idCH].answer === "DapAnD"
                                                                        ? "red"
                                                                        : ""
                                                                }`,
                                                            }}>
                                                            <input
                                                                disabled={`${answer[question.idCH] ? "true" : ""}`}
                                                                className="question radio-answer"
                                                                type="radio"
                                                                data-id={question.idCH}
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
                                        {answer[question.idCH] && (
                                            <div className="col-md-12 dapan2">
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
                    <div className="nextpre">
                        <ul className="pager next2">
                            <li className="previous cautruoc">
                                <a href="" onClick={onClickPrevQuestion}>
                                    Câu trước
                                </a>
                            </li>
                            <li className="next causau">
                                <a href="" onClick={onClickNextQuestion}>
                                    Câu tiếp theo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="clear" />
                {/* <div className="col-md-4 col-sm-12 col-xs-12 ">
                    <div className="border1">
                        <div className="panel panel-primary panel-heading " id="">
                            <strong style={{ fontSize: "12pt", color: "blue" }}>
                                Thời gian còn lại:{" "}
                                <span id="countdown" className="timer">
                                    17:02
                                </span>
                            </strong>
                        </div>
                    </div>
                    <div className="panel panel-default" id="blockC">
                        <div className="panel-body-1">
                            <div className="text-center-1">
                                <input
                                    className="btn-1 btn-primary btn-block choose"
                                    type="submit"
                                    onClick={() => setFinish(true)} //c1
                                    name="nopbai"
                                    id="nopbai"
                                    value="KẾT THÚC BÀI THI"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
