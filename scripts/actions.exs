defmodule Beauty.Actions do
  alias Beauty.Participant
  alias Beauty.Host
  alias Beauty.Main

  def change_page(data, page) do
    if page == "experiment" do
      if data.round < data.maxround do
        results = %{
          participants: %{},
          sum: 0,
          inputs: 0,
          round: data.round+1
        }
        data = data
               |> put_in([:results],[results] ++ data.results)
        host = get_action("update contents", Host.format_contents(data))
        action = get_action("change page", %{ page_data: page, results_data: data.results})
        format(data, host, dispatch_to_all(data, action))
      else
        action = get_action("change page", %{ page_data: page, results_data: data.results})
        format(data, nil, dispatch_to_all(data, action))
      end
    else
      if page == "waiting" do
        data = data
               |> put_in([:round],0)
      end
      host = get_action("update contents", Host.format_contents(data))
      action = get_action("change page", %{ page_data: page, results_data: data.results})
      format(data, host, dispatch_to_all(data, action))
    end
  end

  def change_round(data,round) do
    host = get_action("update contents", Host.format_contents(data))
    action = get_action("change round", round)
    format(data, host, dispatch_to_all(data, action))
  end

  def set_result_page(data,page)do
    host = get_action("update contents", Host.format_contents(data))
    format(data, host)
  end 

  def join(data, id, participant) do
    host = get_action("join", %{id: id, participant: participant})
    action = get_action("join", %{
	     joined_data: Map.size(data.participants)
    })
    format(data, host,dispatch_to_all(data,action))
  end

  def update_host_contents(data) do
    host = get_action("update contents", Host.format_contents(data))
    format(data, host)
  end

  def update_participant_contents(data, id) do
    participant = dispatch_to(id, get_action("update contents", Participant.format_contents(data, id)))
    format(data, nil, participant)
  end
  
  def input(data, id) do
    number = get_in(data,[:participants, id, :number])
    inputs = get_in(data,[:inputs])
    host = get_action("input", %{id: id, number: number, inputs: inputs, sum_data: data.sum,results_data: data.results})
    participant = dispatch_to(id, get_action("input", number))
    format(data, host, participant)
  end 

  def set_data(data) do
    host = get_action("set_data", Host.format_contents(data))
    action = get_action("set_data", %{
      joined_data: Map.size(data.participants),
      round_data: data.round
    })
    format(data,host,dispatch_to_all(data,action))
    end

   def updata_input(data,inputs,joined) do
    action = get_action("updata input", %{
    	inputs_data: inputs,
	    joined_data: joined,
	})
    format(data,nil,dispatch_to_all(data,action))
    end

  # Utilities

  defp get_action(type, params) do
    %{
      type: type,
      payload: params
    }
  end

  defp dispatch_to(map \\ %{}, id, action) do
    Map.put(map, id, %{action: action})
  end

  defp dispatch_to_all(%{participants: participants}, action) do
    Enum.reduce(participants, %{}, fn {id, _}, acc -> dispatch_to(acc, id, action) end)
  end

  defp format(data, host, participants \\ nil) do
    result = %{"data" => data}
    unless is_nil(host) do
      result = Map.put(result, "host", %{action: host})
    end
    unless is_nil(participants) do
      result = Map.put(result, "participant", participants)
    end
    {:ok, result}
  end
end
