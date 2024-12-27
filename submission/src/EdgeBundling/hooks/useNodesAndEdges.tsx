// Define Node and Edge types
import {FlightData} from './useDataParsing.tsx';
import {Edge, Node} from '../EdgeBundling.types.ts';
import {useMemo} from "react";

function haversine(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
}

function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

function useNodesAndEdges(flightData: FlightData[], d: number) {
    return useMemo(() => {

        const nodesMap = new Map<string, Node>();
    const edges: Edge[] = [];

    flightData.forEach((data) => {
        let sourceNode = nodesMap.get(data.Source_airport);
        if (!sourceNode) {
            sourceNode = {
                id: data.Source_airport,
                lat: Number(data.Source_Latitude),
                lng: Number(data.Source_Longitude),
                edges: [],
                distance: Infinity,
                visited: false,
                previous: null,
            };
            nodesMap.set(data.Source_airport, sourceNode);
        }

        let destNode = nodesMap.get(data.Destination_airport);
        if (!destNode) {
            destNode = {
                id: data.Destination_airport,
                lat: Number(data.Destination_Latitude),
                lng: Number(data.Destination_Longitude),
                edges: [],
                distance: Infinity,
                visited: false,
                previous: null,
            };
            nodesMap.set(data.Destination_airport, destNode);
        }

        const distance = haversine(
            sourceNode.lat,
            sourceNode.lng,
            destNode.lat,
            destNode.lng
        );

        const weight = Math.pow(distance, d);

        const edge: Edge = {
            source: sourceNode,
            destination: destNode,
            distance: distance,
            weight: weight,
            lock: false,
            skip: false,
        };

        // For undirected graph, add reverse edge
        const reverseEdge: Edge = {
            source: destNode,
            destination: sourceNode,
            distance: distance,
            weight: weight,
            lock: false,
            skip: false,
        };

        sourceNode.edges.push(edge);
        destNode.edges.push(reverseEdge);

        edges.push(edge);
        edges.push(reverseEdge);
    });

    return { nodesMap, edges };
    }, [flightData, d]);
}


export default useNodesAndEdges;
