import React from 'react';

function Diary() {
  return (
    <div>
      <ul>
        {Array.from({ length: 6 }, (_, idx) => idx + 1).map((data) => (
          <li>{data}</li>
        ))}
      </ul>
      <div>Diary 다이어리</div>
    </div>
  );
}

export default Diary;
