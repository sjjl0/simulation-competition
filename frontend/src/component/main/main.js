import React, { useState } from 'react';

let path = "http://tmvmc.com/study/learn/study_scorm.html?id=1452";

export default function MainPage() {
    const [iFrameHeight, setIFrameHeight] = useState('0px')

    return (
        <div>
            <iframe  scrolling="yes" frameBorder="0" title="main"
                     style={{width:'100%',height:iFrameHeight, overflow:'visible'}}
                     onLoad={() => {//iframe高度不超过content的高度即可
                         let h = document.documentElement.clientHeight - 20
                         setIFrameHeight(h + 'px')
                     }}
                     src={path}
            />
        </div>
    )
}