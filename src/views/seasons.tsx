const Seasons = (props: { data: { tablename: string }[] }) => {
  return (
    <div class="flex flex-col p-10">
      <div class="flex">
        <select
          hx-post="/api/v1/footballers"
          hx-target="#results"
          hx-triggrer="change"
          class="select select-sm select-accent w-full max-w-xs"
          name="season"
        >
          <option disabled selected>
            Select a season
          </option>
          {props.data.map((item) => {
            return (
              <option value={item.tablename}>{item.tablename}</option>
            );
          })}
        </select>
      </div>
      <div class="mt-5 flex" id="results"></div>
    </div>
  );
};

export default Seasons;
