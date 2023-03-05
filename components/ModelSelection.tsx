"use client";

import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

function ModelSelection() {
  const  models  = ["text-davinci-003", "text-daivinci-004"]

  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  return (
    <div className='mt-2'>
      <Select
        className='mt-2'
        defaultValue={model}
        placeholder={model}
        isSearchable
        menuPosition='fixed'
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654] ",
        }}
        options={models}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
