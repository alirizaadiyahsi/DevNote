import {Component, OnInit} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  sidebarItems: TreeNode[];
  selectedSidebarItem: any;
  sidebarContextMenuItems: MenuItem[];

  constructor() {
    this.sidebarContextMenuItems = [
      { label: 'View', icon: 'pi pi-search', command: (event) => console.log(event) },
      { label: 'Toggle', icon: 'pi pi-sort', command: (event) => console.log(event) }
    ];

    this.sidebarItems = [
      {
        data: {
          name: "Documents",
          size: "75kb",
          type: "Folder"
        },
        expanded:true,
        children: [
          {
            data: {
              name: "Work",
              size: "55kb",
              type: "Folder"
            },
            expanded:true,
            children: [
              {
                data: {
                  name: "Expenses.doc",
                  size: "30kb",
                  type: "Document"
                }
              },
              {
                data: {
                  name: "Resume.doc",
                  size: "25kb",
                  type: "Resume"
                }
              }
            ]
          },
          {
            data: {
              name: "Home",
              size: "20kb",
              type: "Folder"
            },
            expanded:true,
            children: [
              {
                data: {
                  name: "Invoices",
                  size: "20kb",
                  type: "Text"
                }
              }
            ]
          }
        ]
      },
      {
        data: {
          name: "Pictures",
          size: "150kb",
          type: "Folder"
        },
        expanded:true,
        children: [
          {
            data: {
              name: "barcelona.jpg",
              size: "90kb",
              type: "Picture"
            }
          },
          {
            data: {
              name: "primeui.png",
              size: "30kb",
              type: "Picture"
            }
          },
          {
            data: {
              name: "optimus.jpg",
              size: "30kb",
              type: "Picture"
            }
          }
        ]
      }
    ];

  }

  ngOnInit(): void {
  }
}
