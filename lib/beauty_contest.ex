defmodule BeautyContest do
  use XeeThemeScript
  require Logger
  alias BeautyContest.Main
  alias BeautyContest.Actions
  alias BeautyContest.Host
  alias BeautyContest.Participant

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil
  
  def init do
    {:ok, %{data: Main.init()}}
  end
  
  def join(data, id) do
    wrap_result(data, Main.join(data, id))
  end
  
  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[BeautyContest] #{action} #{params}")
    result = case {action, params} do
      {"fetch contents", _} -> Actions.update_host_contents(data)
      {"change page", page} -> Host.change_page(data, page)
      {"change result page", page} -> Host.change_result_page(data, page)
      {"change round",round} -> Host.change_round(data,round)
      {"visit", _} -> Host.visit(data)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end
  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[BeautyContest] #{action} #{params}")
    result = case {action, params} do
      {"fetch contents", _} -> Actions.update_participant_contents(data, id)
      {"input", number} -> Participant.input(data,id, number)
      {"update input", _} -> Participant.update_input(data,id)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Utilities
  def wrap_result(old, {:ok, result}) do
    {:ok, Main.compute_diff(old, result)}
  end

  def wrap_result(old, new) do
    {:ok, Main.compute_diff(old, %{data: new})}
  end
end
