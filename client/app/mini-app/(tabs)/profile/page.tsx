import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Send } from "lucide-react";

export default function Component() {
  return (
    <div className="grid max-w-3xl gap-4 px-4 mx-auto lg:grid-cols-2 lg:gap-6 xl:gap-10">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex flex-col items-center space-x-4">
          <Avatar className="flex justify-center items-center w-12 h-12 bg-gray-500 mb-4">
            PFP
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">João Silva</h1>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Apaixonado por Web3, desenvolvmento e finanças.
        </p>
      </div>
      <div className="space-y-4">
        <Card className="border-none shadow-none">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value="João Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Qual a mensagem de hoje?"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <CardFooter className="flex items-start w-full">
            <Button className="ml-auto">Save</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Atividade Recente</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="flex items-center space-x-4">
              <ArrowRightLeft className="w-6 h-6" />
              <div className="grid items-center grid-rows-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Swap de tokens
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  30 min
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4">
              <Send className="w-6 h-6" />
              <div className="grid items-center grid-rows-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Transferência via Agente de IA
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  1 dia atrás
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
