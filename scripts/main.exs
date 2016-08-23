defmodule Beauty.Main do
  alias Beauty.Actions

  @pages ["waiting", "description", "experiment", "result"]

  def pages, do: @pages

  def init do
    %{
      page: "waiting",
      inputs: 0,
      actives: 0,
      participants: %{},
      average: 0,
      sum: 0,
    }
  end

  def new_participant do
    %{
    	number: 0,
	active: false,
	inputed: false,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()
      actives = get_in(data, [:actives])

     if data.page == "waiting" do
         actives = actives + 1
         new = new
	       |>put_in([:active], true)
     else
         new = new
	       |>put_in([:active],false)
     end

      put_in(data, [:participants, id], new)
      |>put_in([:actives], actives)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end
