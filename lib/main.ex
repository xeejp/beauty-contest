defmodule BeautyContest.Main do
  require Logger
  alias BeautyContest.Host
  alias BeautyContest.Participant

  def init do
    %{
      page: "waiting",
      inputs: 0,
      participants: %{},
      results: [],
      sum: 0,
      round: 0,
      maxround: 10,
      result_page: 0,
      is_first_visit: true,
      inputs: 0,
      joined: 0
    }
  end

  def new_participant(id) do
    %{
      id: id,
      number: 0,
      inputed: false
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(id)

      data |> put_in([:participants, id], new)
           |> Map.update!(:joined,fn n -> n+1 end)
    else
      data
    end
  end

  def compute_diff(old, %{data: new} = result) do
    import Participant, only: [filter_data: 2]
    import Host, only: [filter_data: 1]

    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> JsonDiffEx.diff(filter_data(old, id), filter_data(new, id)) end)}
    end)
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end
end
