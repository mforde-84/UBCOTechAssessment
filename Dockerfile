ARG REPO=mcr.microsoft.com/dotnet/core
FROM $REPO/aspnet AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
ENV BuildingDocker true
WORKDIR /UBCO.Presentation.API
COPY ["/UBCO.Presentation.API/UBCO.Presentation.API.csproj", ""]
RUN dotnet restore "/UBCO.Presentation.API/UBCO.Presentation.API.csproj"
COPY . .
WORKDIR "/UBCO.Presentation.API"
RUN dotnet build "/UBCO.Presentation.API/UBCO.Presentation.API.csproj" -c Release -o /app/build

FROM node:12-alpine as build-node
WORKDIR /ubco.ui
COPY ubco.ui/package.json .
COPY ubco.ui/package-lock.json .
RUN npm install
COPY ubco.ui/ .
RUN npm run-script build

FROM build AS publish
RUN dotnet publish "UBCO.Presentation.API/UBCO.Presentation.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build-node /ubco.ui/build ./ubco.ui/build
CMD ASPNETCORE_URLS=http://*:$PORT dotnet UBCOTechAssessment.dll