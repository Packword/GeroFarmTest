FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["GF.Web/GF.Web.csproj", "GF.Web/"]
RUN dotnet restore "GF.Web/GF.Web.csproj"
COPY . .
WORKDIR "/src/GF.Web"
RUN dotnet build "GF.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GF.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GF.Web.dll"]