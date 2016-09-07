defmodule Beauty.Host do
  alias Beauty.Main
  alias Beauty.Actions
  require Logger

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def change_result_page(data, page) do
    data = data
           |> put_in([:result_page],page)
    data
    |> Actions.set_result_page(page) 
  end
 
  def change_round(data,round)do
    Logger.debug("[Beauty] round: #{round}")
    data = data
           |>put_in([:maxround],round)
    data
    |> Actions.change_round(round)
  end

  def set_data(data) do
    if data.round < data.maxround do
      data = data |>Map.put(:participants,Enum.into(Enum.map(data.participants, fn { id, _} ->
       {id,
          %{
	          number: 0,
	          inputed: false,
	        }
        }
      end), %{}))
    
      data = data 
             |>put_in([:inputs],0)
	           |>put_in([:sum],0)
             |>put_in([:round],data.round+1)
             |>put_in([:result_page],0)
      data
      |> Actions.set_data()
    else
      data
    end
  end

  
# Utilities
  def format_contents(data) do
    data
  end
end
