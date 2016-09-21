defmodule Beauty do 
  use XeeThemeScript 
  require Logger 
  alias Beauty.Main 
  alias Beauty.Host 
  alias Beauty.Participant 
  # Callbacks 
  def script_type do 
    :message 
  end 
  def install, do: nil 
  def init do 
    {:ok, %{"data" => Main.init()}} 
  end 
  def wrap_result({:ok, _} = result), do: result 
  def wrap_result(result), do: Main.wrap(result) 
  def join(data, id) do 
    wrap_result(Main.join(data, id)) 
  end 
  # Host router 
  def handle_received(data, %{"action" => action, "params" => params}) do 
    Logger.debug("[Beauty] #{action} #{params}") 
    result = case {action, params} do 
      {"fetch contents", _} -> Host.fetch_contents(data) 
      {"change page", page} -> Host.change_page(data, page) 
      {"set_data", _} -> Host.set_data(data) 
      {"change result page", page} -> Host.change_result_page(data, page) 
      {"change round",round} -> Host.change_round(data,round) 
      _ -> {:ok, %{"data" => data}} 
    end 
    wrap_result(result) 
  end 
  # Participant router 
  def handle_received(data, %{"action" => action, "params" => params}, id) do 
    Logger.debug("[Beauty] #{action} #{params}") 
    result = case {action, params} do 
      {"fetch contents", _} -> Participant.fetch_contents(data, id) 
      {"input", number} -> Participant.input(data,id, number) 
      {"update input", _} -> Participant.update_input(data,id) 
      _ -> {:ok, %{"data" => data}} 
    end 
    wrap_result(result) 
  end 
end 
