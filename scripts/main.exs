defmodule Beauty.Main do
  alias Beauty.Actions

  @pages ["waiting", "description", "experiment", "result"]

  def pages, do: @pages

  def init do
    %{
      page: "waiting",
      participants: %{},
    }
  end

  def new_participant do
    %{
    	number: 0
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
