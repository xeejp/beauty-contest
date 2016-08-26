defmodule Beauty.Main do
  alias Beauty.Actions

  @pages ["waiting", "description", "experiment", "result"]

  def pages, do: @pages

  def init do
    %{
      page: "waiting",
      inputs: 0,
      participants: %{},
      results: [],
      sum: 0,
      round: 0,
      result_page: 0
    }
  end

  def new_participant do
    %{
    	number: 0,
	inputed: false,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()

      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end
