import { useState } from 'react';

function CreateCard({ x, setData }) {
  const [input, setInput] = useState({

    label: "test",
    cusineType: "placeholder",


  });

  const handleInput = (e) => {
    setInput((prevState) => {
      const property = e.target.name;
      console.log(e.target.name);

      console.log("prev", prevState[property]);

      prevState[property] = e.target.value;
      console.log(prevState);

      return { ...prevState };
    })


  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // create();
    setInput("");
  }
  const create = async () => {

    if (testData) {
      await fetch(" http://localhost:5000/api/", {
        method: "POST",
        body: JSON.stringify({
          label: testData.label,
          cusineType: testData.cusineType,
          ingredients: testData.ingredients
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(res => res.json()).then(updatedata => {

        console.log(updatedata)
        setData([...x, updatedata])

      })
    } else {

    }

  }
  return (
    <>


      <form className="flex flex-col" method="post" required>
        <input placeholder="name" value={input.label} onChange={handleInput} type='text' required name="label" id="" />
        <input name="cusineType" value={input.cusineType} placeholder='type of cusine ' onChange={handleInput} />
        <input name="ing" placeholder='ingredients' onChange={handleInput} />
        <button className="bg-amber-400 " type="submit" onClick={handleSubmit}>Create New Recipie</button>
      </form>
    </>


  )
}

export default CreateCard