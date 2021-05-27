import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.png";
import "./app.scss";
import Item from "./Item";
import { useDebounce } from "./utils";

// eslint-disable-next-line react/prop-types
const Hello: FC = () => {
  const homeInfo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [compList, setCompList] = useState([1, 2]);
  const [showCompleted, setShowCompleted] = useState(false);
  const bottomDomRef = useRef<HTMLDivElement>(null);
  const compGroups = useMemo(() => splitGroups(homeInfo, 3), [homeInfo]);
  const groupCount = compGroups.length;
  const [groupIdx, setGroupIdx] = useState(0);

  const [scrollRenderHandler] = useDebounce((): void => {
    const rect = bottomDomRef.current?.getBoundingClientRect();
    console.log(rect);
    const top = rect ? rect.top : 0;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (top < clientHeight && groupIdx < groupCount) {
      setCompList(compList.concat(compGroups[groupIdx]));
      setGroupIdx(groupIdx + 1);
    } else if (groupIdx >= groupCount) {
      bottomDomRef.current.style.display = "none";
      setShowCompleted(true);
    }
  },
  300,
  [compGroups, compList, groupIdx],
 );
 
  function splitGroups (homeList: any[], pageSize: number): any[] {
    const groupsTemp = [];
    for (let i = 0; i < homeList.length; i += pageSize) {
      groupsTemp.push(homeList.slice(i, i + pageSize));
    }
    return groupsTemp;
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollRenderHandler);
    return (): void => {
      document.removeEventListener("scroll", scrollRenderHandler);
    }
  }, [scrollRenderHandler]);

  return <>
    <img src={logo}></img>
    <div className="item-list">
      {
        compList.map((item, index) => (
          <div className="home-item" key={index}>
            <Item title={item}/>
          </div>
        ))
      }
    </div>

    <div ref={bottomDomRef} className="bottom-loading">
    <p>Loading。。。</p>
    </div>
    {
      showCompleted && <div className="bottom-completed">
      <p>已经到底了</p>
    </div>
    }
  </>
};

ReactDOM.render(
  <Hello />,
  document.querySelector("#root")
);
