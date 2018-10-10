defmodule BeautyContest.Participant do

  # Actions
  def input(data, id, number)do
    if data.page == "experiment" && is_number(number) && number >= 0 && number <= 100 do
	    inputs = get_in(data, [:inputs])+1
      sum = get_in(data, [:sum])+number
      participant = get_in(data,[:participants, id])
      participant = participant
                    |> put_in([:inputed],true)
                    |> put_in([:number], number)
     
  	  data = data
	         |> put_in([:participants, id], participant)
    
      result = %{
          participants: data.participants,
          sum: sum,
          inputs: inputs,
          round: data.round
      } 

      data  |> put_in([:inputs], inputs)
            |> put_in([:sum], sum)
            |> put_in([:results], List.replace_at(data.results, 0, result))
    else
      data
    end
  end

  # Utilities

  def get_filter(data, id) do
    %{
      _default: true,
      participants: %{
				id => true
      },
      sum: data.page == "result",
      result_page: false,
      is_first_visit: false,
      _spread: [[:participants, id]],
    }
  end

  def filter_data(data, id) do
    Transmap.transform(data, get_filter(data, id), diff: false)
    |> Map.delete(:participants)
  end
end