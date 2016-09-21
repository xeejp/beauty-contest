defmodule Beauty.Participant do
  alias Beauty.Actions
  alias Beauty.Host

  # Actions
  def fetch_contents(data, id) do
     if data.page == "waiting", do: data = data |> put_in([:participants, id, :active], true)
    Actions.update_participant_contents(data, id)
  end

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

        data = data
		           |> put_in([:inputs], inputs)
		           |> put_in([:sum], sum)
               |> put_in([:results], List.replace_at(data.results, 0, result))
	    Actions.input(data, id)
    else
      data
    end
  end

  def update_input(data,id) do
    if data.page == "experiment" do
       inputs =  get_in(data, [:inputs])
       joined = Map.size(data.participants)
	     data
	     |> Actions.updata_input(inputs, joined)
    else 
      data
    end
  end

          
          


  # Utilities

  def format_participant(participant), do: participant

  def format_data(data,id) do
    %{
      page: data.page,
      inputs: data.inputs,
      joined: Map.size(data.participants),
      id: id,
      results: data.results,
      round: data.round,
      maxround: data.maxround
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
    |> Map.merge(format_data(data,id))
  end
end
