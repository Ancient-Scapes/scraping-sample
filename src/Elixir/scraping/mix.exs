defmodule Scraping.MixProject do
  use Mix.Project

  def project do
    [
      app: :scraping,
      version: "0.1.0",
      elixir: "~> 1.7",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:httpoison, "~> 0.7.2"},
      {:floki, "~> 0.17.2"}
    ]
  end
end