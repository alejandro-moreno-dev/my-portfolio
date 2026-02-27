# Architecture Decision Records

## ADR-001: Feature-Based Structure

Features own their domain logic to avoid cross-module coupling.

## ADR-002: Service Isolation

All async logic is abstracted into a service layer to decouple UI from data sources.
