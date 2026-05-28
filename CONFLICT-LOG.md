Paso 1: Los cambios en la rama secundaria (rama-index-eventos)
En la primera imagen se observa la aplicación GitHub Desktop. 
•	El usuario se encuentra en el repositorio Eventos-Chiapas trabajando en la rama secundaria llamada rama-index-eventos. 
•	Se muestra una modificación en el archivo Chiapas/eventos.html. 
•	El cambio: En la línea 22, se reemplazó el texto original Eventos Chiapas (marcado en rojo) por Eventos Chiapas TIC (marcado en verde). 
 















Paso 2: El cambio conflictivo en la rama secundaria (rama_img)
La segunda imagen muestra una situación crítica en GitHub Desktop que es la que detonará el conflicto.
•	El usuario cambió a la rama rama_img (se nota arriba donde dice Current branch).
•	En esta rama, modificó exactamente la misma línea de código de un archivo similar (Chiapas/index.html).
•	El cambio: En lugar de poner "TIC", en la rama main cambió el texto original por Eventos Chiapas MONO.
•	Abajo a la izquierda se ve que el usuario hace un commit con el mensaje "Update index.html" para guardar este cambio en main.
•	Nota de contexto: Modificar la misma línea con textos diferentes en dos ramas distintas es la receta perfecta para generar un conflicto, ya que Git no sabrá con cuál versión quedarse al unirlas.
 




Paso 3: La detección del conflicto en el Pull Request
La tercera imagen nos traslada a la interfaz web de GitHub, donde el usuario Vanitas-Sky abrió el Pull Request #15 titulado "Update eventos.html".
•	El objetivo del Pull Request es fusionar (merge) los cambios de rama-index-eventos hacia la rama main.
•	GitHub detecta el problema inmediatamente y muestra un cuadro gris con un aviso de advertencia: "This branch has conflicts that must be resolved" (Esta rama tiene conflictos que deben ser resueltos).
•	Específicamente señala que el conflicto se encuentra en el archivo Chiapas/eventos.html.
•	A la derecha, aparece el botón "Resolve conflicts" para solucionar el problema.
 

Paso 4: La resolución del conflicto (asistida por IA y confirmación)
La cuarta y última imagen muestra el desenlace exitoso del conflicto en la web de GitHub.
•	Se observa en el historial de la conversación que el usuario interactuó con GitHub Copilot.
•	Copilot intervino dejando un comentario: "@copilot resolve the merge conflicts in this pull request" y procedió a realizar un commit automático (Merge branch 'main' into...) para solucionar el solapamiento de líneas.
•	El usuario Vanitas-Sky validó la solución dejando un comentario que dice "Corregido".
•	El resultado: El cuadro de advertencia gris cambió a un cuadro verde brillante con el mensaje "No conflicts with base branch" (No hay conflictos con la rama base). El botón "Merge pull request" ahora está habilitado y listo para completarse de forma automática.
 
