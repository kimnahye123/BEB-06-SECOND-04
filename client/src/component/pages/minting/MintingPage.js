import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const MintingPageBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 100px 0px 100px;
  .mintingHeader {
    .tapMinting {
      width: 250px;
      padding-bottom: 5px;
      text-align: center;
      font-weight: 600;
      border-bottom: 3px solid rgb(82, 192, 255);
      cursor: pointer;
    }
  }

  .mintingBody {
    flex-direction: column;
    margin-top: 70px;
    text-align: center;
    .mintingText1 {
      font-size: 20px;
      font-weight: 500;
    }
    .mintingText2 {
      margin-top: 10px;
      font-size: 18px;
    }
    .mintingImg {
      object-fit: cover;
      width: 400px;
      height: 400px;
      margin-top: 30px;
      background-color: #e5daff;
      border: 2px solid rgba(110, 110, 110, 0.8);
      position: relative;
    }
    #ex_file {
      width: 420px;
      border: 0 solid rgba(110, 110, 110, 0.8);
      padding: 0px 5px 0px 5px;
    }
    .file_box {
      width: 238px;
      height: 300px;
      display: inline-block;
      border: 3px;
    }
    .uploadImageon {
      width: 393px;
      height: 393px;
      position: absolute;
    }
    input,
    textarea {
      width: 420px;
      border: 2px solid rgba(110, 110, 110, 0.8);
      padding: 0px 5px 0px 5px;
    }
    .mintingNFTName {
      margin-top: 30px;
      input {
        height: 30px;
      }
    }
    .mintingNFTDesc {
      margin-top: 10px;
      textarea {
        height: 70px;
        padding-top: 5px;
        resize: none;
        overflow: hidden;
      }
    }
    .mintingB {
      margin-top: 30px;
      background-color: #e5daff;
      button {
        width: 120px;
        height: 40px;
        border: 0px;
        color: white;

        background-color: rgb(82, 192, 255);
      }
    }
  }
`;

const MintingPage = () => {
  const [imageView, setImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = (e) => {
    let file = e.target.files[0];
    const file_url = URL.createObjectURL(file);
    document.querySelector(".uploadImage").src = file_url;
    setImage(true);
    console.log(file_url);
    //blob:http://localhost:3000/aad74c35-6ea4-4745-b791-fdc827a52a59
  };

  // 서버에 url formdata로 보내기

  // const setFile = (e) => {
  //   if(e.target.files[0]){
  //     const img = new FormData();
  //     img.append('file',e.target.files[0]);
  //     axios.post('http://localhost://3005/',img).them((res)=>{
  //       setImageUrl(res.data);
  //     }).catch((err)=>{
  //       console.error(err);
  //     })
  //   }
  // }

  return (
    <MintingPageBox>
      <div className="mintingHeader">
        <div className="tapMinting">Minting</div>
      </div>
      <div className="mintingBody cc">
        <div className="mintingText1">Create your own NFT</div>
        <div className="mintingText2">Minting per 1 FTC</div>
        <div className="mintingImg">
          <label className="file_box" htmlFor="ex_file">
            <div className="file_label_div"></div>
          </label>
          <input
            type="file"
            id="ex_file"
            onChange={uploadImage}
            name="image"
          ></input>
          <div className="mintingImg cc">
            <img className={"uploadImage" + (imageView ? "on" : "")}></img>
          </div>
        </div>
        <div className="mintingNFTName">
          <input placeholder="NFT name" />
        </div>
        <div className="mintingNFTDesc">
          <textarea placeholder="Description" />
        </div>
        <div className="mintingB">
          <button>MINTING</button>
        </div>
      </div>
    </MintingPageBox>
  );
};

export default MintingPage;
