import React from 'react';

function Card({ title }) {
  console.log(title);
  const c = (<h1>   nothing to show here</h1>);

  return (
    <div>
      {
        !title ? c : title.map((t, index) => {

          if (!t.title) {
            return <h1 key={index}>No title given for this one</h1>
          } else {
            return <h1 key={index}>{t.title}</h1>
          }


        })


      }
    </div>
  )
}

export default Card