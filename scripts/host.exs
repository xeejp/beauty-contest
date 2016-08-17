defmodule Beauty.Host do
  alias Beauty.Main
  alias Beauty.Actions

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

# Utilities
  def format_contents(data) do
    data
  end
end
