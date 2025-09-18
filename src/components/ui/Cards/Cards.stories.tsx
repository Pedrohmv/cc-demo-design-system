import type { Meta as akjshdkajs, StoryObj } from "@storybook/react";
import Cards from "./Cards";

const meta = {
  title: "ui/Cards",
  component: Cards,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onOddClick: { action: "odd clicked" },
    onRedeemClick: { action: "redeem clicked" },
  },
} satisfies Meta<typeof Cards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    homeTeam: "Man. City",
    awayTeam: "Barcelona",
    league: "Champions League",
    matchTime: "Hoje, 14:00",
    betTitle: "Para chutar uma bola.",
    originalOdds: "4.5",
    newOdds: "Mais de 0.5",
    betType: "Finalizações ao gol",
    playerName: "E. Haaland",
    playerTeam: "Man. City",
    oddValue: "1.65x",
  },
};

export const DifferentMatch: Story = {
  args: {
    homeTeam: "Real Madrid",
    awayTeam: "PSG",
    league: "UEFA Champions League",
    matchTime: "Amanhã, 16:30",
    betTitle: "Para fazer um gol.",
    originalOdds: "3.2",
    newOdds: "Mais de 1.5",
    betType: "Gols marcados",
    playerName: "K. Mbappé",
    playerTeam: "Real Madrid",
    oddValue: "2.15x",
  },
};

export const PremierLeague: Story = {
  args: {
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    league: "Premier League",
    matchTime: "Sábado, 15:30",
    betTitle: "Para dar uma assistência.",
    originalOdds: "5.0",
    newOdds: "Mais de 0.5",
    betType: "Assistências",
    playerName: "M. Ødegaard",
    playerTeam: "Arsenal",
    oddValue: "1.80x",
  },
};

export const LaLiga: Story = {
  args: {
    homeTeam: "Barcelona",
    awayTeam: "Atletico Madrid",
    league: "La Liga",
    matchTime: "Domingo, 21:00",
    betTitle: "Para receber cartão.",
    originalOdds: "2.8",
    newOdds: "Mais de 0.5",
    betType: "Cartões recebidos",
    playerName: "Pedri",
    playerTeam: "Barcelona",
    oddValue: "3.20x",
  },
};

export const WithActions: Story = {
  args: {
    homeTeam: "Liverpool",
    awayTeam: "Manchester United",
    league: "Premier League",
    matchTime: "Hoje, 17:00",
    betTitle: "Para marcar um hat-trick.",
    originalOdds: "8.5",
    newOdds: "Mais de 2.5",
    betType: "Gols marcados",
    playerName: "M. Salah",
    playerTeam: "Liverpool",
    oddValue: "4.50x",
    onOddClick: () => alert("Odd clicked! Adding to bet slip..."),
    onRedeemClick: () => alert("Redeeming reward!"),
  },
};

export const Brasileira: Story = {
  args: {
    homeTeam: "Flamengo",
    awayTeam: "Atletico Mineiro",
    league: "Brasileirao",
    matchTime: "Domingo, 21:00",
    betTitle: "Para receber cartão.",
    originalOdds: "2.8",
    newOdds: "Mais de 0.5",
    betType: "Cartões recebidos",
    playerName: "Pedri",
    playerTeam: "Barcelona",
    oddValue: "3.20x",
  },
};

