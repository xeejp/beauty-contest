defmodule BeautyContest.Host do
  
  # Actions
  def visit(data) do
    Map.put(data, :is_first_visit, false)
  end

  def change_page(data, page) do
    data = Map.update!(data, :page, fn _ -> page end)
    case page do
      "waiting" -> data |> put_in([:round],0)
      "experiment" -> set_data(data)
      _ -> data
    end
  end

  def change_result_page(data, page) do
    data = data
           |> put_in([:result_page],page)
  end

  def change_round(data,round)do
    data = data
           |>put_in([:maxround],round)
  end

  def set_data(data) do
    if data.round < data.maxround do
      data = data |>Map.put(:participants,Enum.into(Enum.map(data.participants, fn { id, _} ->
       {id,
          %{
	          number: 0,
            inputed: false,
            id: id
	        }
        }
      end), %{}))

      results = %{
        participants: %{},
        sum: 0,
        inputs: 0,
        round: data.round+1
      }
      
      data |>put_in([:inputs],0)
	         |>put_in([:sum],0)
           |>put_in([:round],data.round+1)
           |>put_in([:result_page],0)
           |>put_in([:results],[results] ++ data.results)
    else
      data
    end
  end


# Utilities
def get_filter(data) do
  map = %{
    _default: true
  }
end

def filter_data(data) do
  Transmap.transform(data, get_filter(data), diff: false)
end
end
