import loadingImg from "../picture/loading.gif";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

function Loading() {
    const [exportDone, setExportDone] = useState(false);
    const [csvData, setCsvData] = useState("");
    const location = useLocation();
    const guildData = location.state.data;

    const CSV_HEADER = [
        { label: "이름", key: "이름" },
        { label: "레벨", key: "레벨" },
        { label: "직업", key: "직업" },
        { label: "서버", key: "서버" },
        { label: "마지막접속", key: "마지막접속" },
        { label: "인기도", key: "인기도" },
        { label: "길드", key: "길드" },
        { label: "종합랭킹", key: "종합랭킹" },
        { label: "월드랭킹", key: "월드랭킹" },
        { label: "직업월드랭킹", key: "직업월드랭킹" },
        { label: "직업전체랭킹", key: "직업전체랭킹" },
        { label: "무릉도장기록", key: "무릉도장기록" },
        { label: "무릉도장시간", key: "무릉도장시간" },
        { label: "더시드기록", key: "더시드기록" },
        { label: "더시드시간", key: "더시드시간" },
        { label: "유니온기록", key: "유니온기록" },
        { label: "유니온레벨", key: "유니온레벨" },
        { label: "업적기록", key: "업적기록" },
        { label: "업적점수", key: "업적점수" },
    ];

    const getGuildListAPI = async (serverValue, inputValue) => {
        axios({
            method: "post",
            url: "/api/crawlGuildList",
            data: {
                serverValue: `${serverValue}`,
                inputValue: `${inputValue}`,
            },
        }).then(async (res) => {
            setCsvData(res.data);
            setExportDone(true);
        });
    };

    useEffect(() => {
        getGuildListAPI(guildData.serverValue, guildData.inputValue);
    }, []);

    return (
        <div>
            <div>
                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "0",
                        marginTop: "30px",
                    }}
                >
                    {exportDone === false ? "내보내기 중" : "완료!"}
                </h1>
                <p style={{ textAlign: "center", margin: "0" }}>
                    {exportDone === false
                        ? "프로그램을 종료하거나 최소화하지마세요"
                        : "이제 종료하셔도 됩니다"}
                </p>
            </div>
            <div>
                <img
                    src={loadingImg}
                    alt="로딩 이미지"
                    style={{ marginLeft: "60px", marginTop: "80px" }}
                />
            </div>
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <CSVLink
                        data={csvData}
                        // filename : 파일명
                        filename={`${guildData.serverValue}서버의 ${guildData.inputValue}의 길드정보`}
                        // extension : 확장자
                        headers={CSV_HEADER}
                    >
                        <button
                            disabled={!exportDone}
                            // onClick={() => console.log(csvData)}
                        >
                            CSV 다운로드
                        </button>
                    </CSVLink>
                </div>
                <div>
                    <Link to="/">
                        <button disabled={!exportDone}>처음화면으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Loading;
