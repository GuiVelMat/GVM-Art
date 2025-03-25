import { AlertDialogFooter, AlertDialogHeader, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchWrapper } from "@/utils/fetch";
import { $Enums, Incidents } from "@prisma/client";
import React from "react";

interface IncidentButtonProps {
    incident: Incidents;
    status: $Enums.status;
}

export const IncidentButton = ({ incident, status }: IncidentButtonProps) => {
    const { toast } = useToast();

    const body = {
        id: incident.id,
        status: status
    };

    const updateIncident = async () => {
        try {
            fetchWrapper(`/api/incidents`, "PUT", body);
            toast({
                title: "Incident updated",
                description: "The incident has been updated successfully",
            });
            location.reload();
        } catch (error) {
            console.log(error);
            toast({
                title: "An error occurred",
                description: "There was an error updating the incident",
                variant: "destructive",
            });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full mt-2">
                    {status === "PENDING" ?
                        "Open Incident"
                        :
                        "Close Incident"
                    }
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold">Confirm update {status}</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500 mt-2">
                        This action will set this report to Ongoing. Do you want to proceed with this operation?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-6 flex justify-end gap-2 font-bold text-white">
                    <AlertDialogCancel className="bg-red-400 hover:bg-red-500 shadow-lg p-3 px-5 rounded-lg">
                        No
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            updateIncident()
                        }}
                        className="bg-green-500 hover:bg-green-600 p-3 px-5 shadow-lg rounded-lg"
                    >
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}