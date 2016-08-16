defmodule ChickenRace do
  use Xee.ThemeScript

  @interaction [
    "interaction",
    "interaction_with_no_information"
  ]

  @no_interaction [
    "no_interaction",
    "no_interaction_and_information",
    "no_interaction_with_optimal"
  ]

  @experiment_types @interaction ++ @no_interaction

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{"data" => %{
       started: false,
       experiment_type: "no_interaction",
       participants: %{},
       exited_users: 0,
       prize: 0,
       host_log: [],
       participant_log: [],
       punished: false,
     }}}
  end

  def join(%{participants: participants} = data, id) do
    if not Map.has_key?(participants, id) and not data.started do
      participants = Map.put(participants, id, nil)
      data = %{data | participants: participants}
      action = %{
        type: "ADD_USER",
        id: id,
        user: nil
      }
      {:ok, %{"data" => data, "host" => %{action: action}}}
    else
      {:ok, %{"data" => data}}
    end
  end

  def handle_received(data, %{"action" => "fetchContents"}) do
    action = %{
      type: "UPDATE_CONTENTS",
      started: data.started,
      experiment_type: data.experiment_type,
      users: data.participants,
      prize: data.prize,
      exited_users: data.exited_users
    }
    {:ok, %{"data" => data, "host" => %{action: action}}}
  end

  def handle_received(data, %{"action" => "changeType", "params" => type}) do
    data = %{data | experiment_type: type, started: false}
    action = %{
      type: "CHANGE_TYPE",
      experiment_type: data.experiment_type,
    }
    participant = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "start"}) do
    participants = Enum.map(data.participants, fn {id, _} -> {id, nil} end) |> Enum.into(%{})
    data = %{data |
     started: true,
     exited_users: 0,
     participants: participants,
     punished: false
   }
    action = %{
      type: "START",
      users: data.participants
    }
    participant = dispatch_to_all(data.participants, action
                  |> Map.put(:users, Map.size(data.participants))
                  |> Map.put(:exited_users, data.exited_users)
    )
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "stop"}) do
    data = %{data | started: false}
    action = %{
      type: "STOP"
    }
    participant = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "updatePrize", "params" => %{"prize" => prize}}) do
    data = %{data | prize: prize}
    action = %{
      type: "UPDATE_PRIZE",
      prize: data.prize
    }
    participant = dispatch_to_all(data.participants, action)
    {:ok, %{"data" => data, "host" => %{action: action}, "participant" => participant}}
  end

  def handle_received(data, %{"action" => "exit"}) do
    if data.started and not data.punished do
      data = data
              |> Map.update!(:exited_users, fn x -> x + 1 end)
      participant = dispatch_to_all(data.participants, %{
        type: "UPDATE_USERS",
        users: Map.size(data.participants),
        exited_users: data.exited_users
      })
      host_action = %{
        type: "UPDATE_EXITED_USER",
        exited_users: data.exited_users
      }
      if Map.size(data.participants) == data.exited_users + 1 do
        participants = Enum.map(data.participants, fn {id, value} ->
          if value == nil do
            {id, :punished}
          else
            {id, value}
          end
        end) |> Enum.into(%{})
        participant = Enum.map(participants, fn {id, value} ->
          value = if value == :punished do
            %{action: %{
              type: "PUNISHED"
            }}
          else
            %{action: %{
              type: "UPDATE_USERS",
              users: Map.size(data.participants),
              exited_users: data.exited_users
            }}
          end
          {id, value}
        end) |> Enum.into(%{})
        data = %{data | participants: participants, punished: true}
        host_action = %{
          type: "UPDATE_USER",
          users: data.participants
        }
      end
      {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant}}
    else
      {:ok, %{"data" => data}}
    end
  end

  def handle_received(data, %{"action" => "exitAll"}) do
    if data.started and not data.punished do
      data = data
              |> Map.put(:exited_users, Map.size(data.participants) - 1)
      participant = dispatch_to_all(data.participants, %{
        type: "UPDATE_USERS",
        users: Map.size(data.participants),
        exited_users: data.exited_users
      })
      host_action = %{
        type: "UPDATE_EXITED_USER",
        exited_users: data.exited_users
      }
      if Map.size(data.participants) == data.exited_users + 1 do
        participants = Enum.map(data.participants, fn {id, value} ->
          if value == nil do
            {id, :punished}
          else
            {id, value}
          end
        end) |> Enum.into(%{})
        participant = Enum.map(participants, fn {id, value} ->
          value = if value == :punished do
            %{action: %{
              type: "PUNISHED"
            }}
          else
            %{action: %{
              type: "UPDATE_USERS",
              users: Map.size(data.participants),
              exited_users: data.exited_users
            }}
          end
          {id, value}
        end) |> Enum.into(%{})
        data = %{data | participants: participants, punished: true}
        host_action = %{
          type: "UPDATE_USER",
          users: data.participants
        }
      end
      {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant}}
    else
      {:ok, %{"data" => data}}
    end
  end

  def handle_received(data, %{"action" => "fetchContents"}, id) do
    action = %{
      type: "UPDATE_CONTENTS",
      started: data.started,
      answered: data.participants[id] != nil,
      punished: data.participants[id] == :punished,
      experiment_type: data.experiment_type,
      users: Map.size(data.participants),
      exited_users: data.exited_users,
      prize: data.prize,
      received_prize: is_map(data.participants[id]) and Map.get(data.participants[id], "prize")
    }
    {:ok, %{"data" => data, "participant" => %{id => %{action: action}}}}
  end

  def handle_received(data, %{"action" => "exit", "params" => params}, id) do
    # if the user haven't exited yet
    if Map.get(data.participants, id, {}) == nil and not data.punished do
      data = data
              |> put_in([:participants, id], Map.put(params, :prize, data.prize))
      if data.experiment_type in @interaction do
        data = Map.update!(data, :exited_users, &(&1 + 1))
      end
      host_action = %{
        type: "UPDATE_USER",
        id: id, user: data.participants[id]
      }
      participant = dispatch_to_all(data.participants, %{
        type: "UPDATE_USERS",
        users: Map.size(data.participants),
        exited_users: data.exited_users
      })
      if Map.size(data.participants) == data.exited_users + 1 do
        {id, nil} = Enum.find(data.participants, fn {id, value} -> value == nil end)
        data = data
                |> put_in([:participants, id], :punished)
                |> Map.put(:punished, true)
        host_action = Map.put(host_action, :users, data.participants)
        participant = %{participant | id => %{
          action: %{
            type: "PUNISHED"
          }
        }}
      end
      {:ok, %{"data" => data, "host" => %{action: host_action}, "participant" => participant}}
    else
      {:ok, %{"data" => data}}
    end
  end

  def dispatch_to_all(participants, action) , do: Enum.map(participants, fn {id, _} ->
    {id, %{action: action}} end) |> Enum.into(%{})
end
