import { useState } from "react";
import serverDB from "../DataBase/mapleServer.json";
import logo from "../picture/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

const noMP = {
    margin: "0",
    padding: "0",
};

function Home() {
    const [findGuild, setFindGuild] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [serverValue, setServerValue] = useState("");

    const [guildMasterName, setGuildMasterName] = useState("");
    const [guildMasterWorld, setGuildMasterWorld] = useState("");
    const [guildMasterLevel, setGuildMasterLevel] = useState("");

    const callServerSearchAPI = async (serverValue, inputValue) => {
        axios({
            method: "post",
            url: "/api/crawlGuildMaster",
            data: {
                serverValue: `${serverValue}`,
                inputValue: `${inputValue}`,
            },
        }).then(async (res) => {
            setGuildMasterName(res.data[0]);
            setGuildMasterWorld(res.data[1]);
            setGuildMasterLevel(res.data[2]);
            if (res.data[0] !== "") {
                setFindGuild(true);
            } else {
                setFindGuild(false);
            }
        });
    };

    const handleSearchClick = (event) => {
        event.preventDefault();
        callServerSearchAPI(serverValue, inputValue);
    };

    const mapleServerLoad = () => {
        const result = [];
        result.push(
            <option value="selServer">==== 서버를 선택해주세요 ====</option>
        );
        result.push(
            <option value="selServer" disabled>
                일반 서버
            </option>
        );
        for (let j = 0; j < serverDB.defaultWorld.length; j++) {
            result.push(
                <option value={serverDB.defaultWorld[j].engName}>
                    {serverDB.defaultWorld[j].korName}
                </option>
            );
        }
        result.push(
            <option value="selServer" disabled>
                리부트 서버
            </option>
        );
        for (let j = 0; j < serverDB.rebootWorld.length; j++) {
            result.push(
                <option value={serverDB.rebootWorld[j].engName}>
                    {serverDB.rebootWorld[j].korName}
                </option>
            );
        }
        return result;
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div className="info">
                <img
                    src={logo}
                    alt="메이플 로고"
                    style={{
                        width: "30vw",
                    }}
                />
                <h2 style={{ marginBottom: "5px" }}>
                    메이플 길드 유저정보 추출기
                </h2>
                <p style={noMP}>v0.0.1</p>
                <p style={noMP}>업데이트따윈 없어용 :D</p>
            </div>
            <div className="searchBox" style={{ marginTop: "20px" }}>
                <select
                    name="mapleServer"
                    id="mapleServer"
                    style={{ width: "200px", textAlign: "center" }}
                    onChange={(event) => setServerValue(event.target.value)}
                >
                    {mapleServerLoad()}
                </select>
                <input
                    type="text"
                    placeholder="길드이름을 입력해주세요"
                    style={{
                        marginTop: "5px",
                        width: "192px",
                        textAlign: "center",
                    }}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <button
                    style={{ width: "200px", marginTop: "5px" }}
                    onClick={handleSearchClick}
                    disabled={
                        inputValue.length >= 1 && serverValue !== ""
                            ? false
                            : true
                    }
                >
                    검색
                </button>
            </div>
            <div style={{ marginTop: "30px" }}>
                <p
                    style={{
                        margin: "0",
                        padding: "0",
                        marginRight: "170px",
                        fontSize: "14px",
                    }}
                >
                    이름
                </p>
                <input
                    type="text"
                    value={guildMasterName}
                    style={{
                        width: "192px",
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                    disabled
                />
                <p
                    style={{
                        margin: "0",
                        padding: "0",
                        marginRight: "170px",
                        fontSize: "14px",
                    }}
                >
                    월드
                </p>
                <input
                    type="text"
                    value={guildMasterWorld}
                    style={{
                        width: "192px",
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                    disabled
                />
                <p
                    style={{
                        margin: "0",
                        padding: "0",
                        marginRight: "134px",
                        fontSize: "14px",
                    }}
                >
                    직업 / 레벨
                </p>
                <input
                    type="text"
                    value={guildMasterLevel}
                    style={{
                        width: "192px",
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                    disabled
                />
                <Link
                    to="/Loading"
                    state={{ data: { serverValue, inputValue } }}
                >
                    <button style={{ width: "200px" }} disabled={!findGuild}>
                        길드원 목록 가져오기
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
