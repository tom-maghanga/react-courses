import { useEffect, useState } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
import Results from "./Results"
import { useQuery } from "@tanstack/react-query";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const[requestParams, setRequestParams] = useState({
    location: "",
    animal : "",
    breed : "",
  });
  const [animal, setAnimal] = useState("cat");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets?? [];

  return (
    <div className="search-params">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target)
          const obj =  {
            animal : formData.get("animal") ?? "",
            breed : formData.get("breed") ?? "",
            location : formData.get("location") ?? ""
          }
          setRequestParams(obj)
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type=""
            name="location"
            id="location"
            
            placeholder="location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            name="breed"
            id="breed"
            disabled={breeds.length === 0}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};
 
export default SearchParams;
