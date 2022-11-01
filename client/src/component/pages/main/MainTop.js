import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/js/all.js";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { filtering, postlist } from "../../../store/slice";

const MainTopBox = styled.div`
  .inputBox {
    width: 100%;
    height: 100px;
    .search {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      height: 30px;

      input {
        width: 280px;
        height: 100%;
        padding: 0px 45px 0px 10px;
        border: 1px solid rgba(155, 155, 155, 0.5);
        border-right: 0px;
        :focus {
          background-color: rgba(189, 189, 189, 0.1);
          outline: none;
        }
      }
      .iconBox {
        position: absolute;
        width: 40px;
        height: 100%;
        border: 1px solid rgba(155, 155, 155, 0.5);
        border-left: 0px;
        transition: 0.2s;
        cursor: pointer;
        :hover {
          background-color: rgba(124, 124, 124, 0.3);
        }
      }
    }
    .postingBox {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      width: 100%;
      //height: 120px;
      margin-top: 20px;
      /* background-color: rgba(255, 106, 106, 0.493); */

      input {
        width: 325px;
        height: 20px;
        padding: 5px 5px;
        border: 1px solid rgba(155, 155, 155, 0.5);
        border-bottom: 0px;
        transition: 0.2s;
        :focus {
          background-color: rgba(189, 189, 189, 0.1);
          outline: none;
        }
      }
      textarea {
        width: ${(props) => (props.active ? "260px" : "260px")};
        height: ${(props) => (props.active ? "80px" : "0px")};
        padding: ${(props) =>
          props.active ? "5px 70px 0px 5px" : "0px 70px 0px 5px"};
        border: 1px solid rgba(155, 155, 155, 0.5);
        border-bottom: 0px;
        transition: 0.3s;
        :focus {
          background-color: rgb(243, 243, 243);
          outline: none;
        }
      }
      .buttonBox {
        //position: absolute;
        right: 10px;

        background-color: rgba(255, 106, 106, 0.493);
        button {
          width: 337px;
          height: 30px;
          color: white;
          background-color: rgb(82, 192, 255);
          border: 1px solid rgba(155, 155, 155, 0.5);
          cursor: pointer;
          transition: 0.2s;
          :hover {
            background-color: rgba(82, 192, 255, 0.8);
          }
        }
      }
    }
  }
`;

const MainTop = () => {
  const dispatch = useDispatch();
  const { nickname } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.post);

  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  const searchFilter = () => {
    console.log("검색 버튼 누름!");
    dispatch(
      filtering({
        list: list.filter((data, index) => data.nickname === nickname),
      })
    );
  };
  // /post
  const posting = () => {
    console.log("포스팅 post 요청");
    axios
      .post(
        `http://localhost:3005/post/write`,
        {
          title: postData.title,
          content: postData.content,
        },
        { "Content-Type": "application/json", withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        // dispatch()
        return axios
          .get(`http://localhost:3005/post/list`)
          .then((res) => {
            dispatch(postlist({ list: res.data.postList }));
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
  };

  const enterAction = (type) => {
    const { title, content: desc } = postData;
    if (type === "search") {
      searchFilter();
    } else if (type === "desc" && title && desc) {
      // 제목과 내용이 다 있을 경우
      posting();
    } else if (type === "desc" && !title) {
      // 제목이 없을 경우
      alert("제목이 없습니다!");
    }
  };

  return (
    <MainTopBox active={active}>
      <div className="inputBox">
        <div className="search">
          <input
            placeholder="찾을 사람 검색!"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction("search");
              }
            }}
          />
          <div className="iconBox cc" onClick={() => searchFilter()}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>
        </div>

        <div
          className="postingBox"
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        >
          <input
            placeholder="무슨일이 일어나고 있나요? (title)"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction("desc");
              }
            }}
          />
          {/* <input
            placeholder="당신의 지갑주소를 알려주세요 (address)"
            value={postData.address}
            onChange={(e) =>
              setPostData({ ...postData, address: e.target.value })
            }
          /> */}
          <textarea
            placeholder="자세하게 말해주세요! (contant)"
            className="ta"
            value={postData.content}
            maxLength={50}
            onChange={(e) => {
              setPostData({
                ...postData,
                content: e.target.value.replace(/\n/g, ""),
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterAction("desc");
              }
            }}
          />
          <div className="buttonBox cc" onClick={() => posting()}>
            <button>Enter</button>
          </div>
        </div>
      </div>
    </MainTopBox>
  );
};

export default MainTop;
