import type { Meta, StoryObj } from "@storybook/react";
import BettingCardHeader from "./BettingCardHeader";

const meta = {
  title: "ui/BettingCardHeader",
  component: BettingCardHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "header clicked" },
  },
} satisfies Meta<typeof BettingCardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeTeam: "Man. City",
    awayTeam: "Barcelona",
    league: "Champions League",
    matchTime: "Hoje, 14:00",
  },
};

export const PremierLeague: Story = {
  args: {
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    league: "Premier League",
    matchTime: "Sábado, 15:30",
  },
};

export const LaLiga: Story = {
  args: {
    homeTeam: "Real Madrid",
    awayTeam: "Atletico Madrid",
    league: "La Liga",
    matchTime: "Domingo, 21:00",
  },
};

export const SerieA: Story = {
  args: {
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    league: "Serie A",
    matchTime: "Sexta, 20:45",
  },
};

export const Bundesliga: Story = {
  args: {
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    league: "Bundesliga",
    matchTime: "Sábado, 18:30",
  },
};

export const WithClick: Story = {
  args: {
    homeTeam: "Liverpool",
    awayTeam: "Manchester United",
    league: "Premier League",
    matchTime: "Hoje, 17:00",
    onClick: () => alert("Header clicked! Navigating to match details..."),
  },
};

export const LongTeamNames: Story = {
  args: {
    homeTeam: "Borussia Mönchengladbach",
    awayTeam: "Eintracht Frankfurt",
    league: "Bundesliga",
    matchTime: "Domingo, 15:30",
  },
};

