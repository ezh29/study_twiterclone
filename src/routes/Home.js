import { dbService } from "fbase";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(), //es6 spread attribute 전개구문
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
      //가끔 set이 붙는 함수를 쓸때 값대신 함수를 전달할 수 있다.
      //그리고 만약 함수를 전달하면 리액트는 이전 값에 접근할 수 있게 해준다
      //리턴하는것은 implicit return이다, [최근 document , 이전 document들]이 들은 배열을 리턴한다
    });
  };
  useEffect(() => {
    getNweets(); //async await 써야하므로 useEffect안에 함수 안적고 따로 위에 뺌
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createAt: Date.now(),
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    //'event로부터'라는 의미, 즉 event안에 있는 target안에 있는 value를 달라고 하는것
    setNweet(value);
  };
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your maind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
